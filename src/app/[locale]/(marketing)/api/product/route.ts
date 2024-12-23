import type { PaginatedResponse, ProductQueryParams } from '@/types/api';
import type { Product } from '@arcjet/next';
import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { productSchema } from '@/models/Schema';
import { ProductValidation } from '@/validations/ProductValidation';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query: ProductQueryParams = {
      page: Number(searchParams.get('page') ?? 1),
      limit: Number(searchParams.get('limit')) || 10,
      sort: (searchParams.get('sort') as ProductQueryParams['sort']) || 'createdAt',
      order: (searchParams.get('order') as ProductQueryParams['order']) || 'desc',
      search: searchParams.get('search') || undefined,
      locale: searchParams.get('locale') || 'en',
    };

    let baseQuery = db
      .select()
      .from(productSchema)
      .as('baseQuery') as any;

    // Apply search
    if (query.search) {
      baseQuery = baseQuery.where(
        sql.raw(
          `(${productSchema.name.name}->>'${query.locale}' ILIKE '%${query.search}%' OR
          ${productSchema.short_description.name}->>'${query.locale}' ILIKE '%${query.search}%')`,
        ),
      );
    }

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(baseQuery.as('filtered_products'));
    const total = countResult[0] ? Number(countResult[0].count) : 0;

    // Apply sorting and pagination
    const products = await baseQuery
      .orderBy(sql`${productSchema[query.sort ?? 'createdAt']} ${sql.raw(query.order ?? 'desc')}`)
      .limit(query.limit)
      .offset(((query.page ?? 1) - 1) * (query.limit ?? 10));

    const response: PaginatedResponse<Product> = {
      data: products,
      meta: {
        total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        totalPages: Math.ceil(total / (query.limit ?? 10)),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const GET_BY_ID = async (
  // request: Request,
  { params }: { params: { slug: string } },
) => {
  try {
    // const { searchParams } = new URL(request.url);
    // const locale = searchParams.get('locale') || 'en';

    const product = await db
      .select()
      .from(productSchema)
      .where(sql`${productSchema.slug} = ${params.slug}`)
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    logger.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const json = await request.json();
    const parse = ProductValidation.safeParse(json);

    if (!parse.success) {
      return NextResponse.json(parse.error.format(), { status: 422 });
    }

    const { id, ...productData } = parse.data;

    // Check for existing slug if provided
    if (id) {
      const existing = await db
        .select()
        .from(productSchema)
        .where(sql`${productSchema.slug} = ${productData.slug} AND ${productSchema.id} != ${id}`)
        .limit(1);

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 409 },
        );
      }
    }

    const product = await db
      .insert(productSchema)
      .values(productData)
      .onConflictDoUpdate({
        target: productSchema.id,
        where: sql`${productSchema.id} = ${id}`,
        set: productData,
      })
      .returning();

    logger.info(`Product ${id ? 'updated' : 'created'}: ${productData.slug}`);

    return NextResponse.json(product[0]);
  } catch (error) {
    logger.error('Error processing product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
