import { FaFacebookSquare, FaLine, FaLinkedin, FaPrint } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

export const SocialBtn = () => {
  return (
    <div className="bg-box">
      <div className="share-btn">
        <span className="text-share-btn">Share</span>
        <ul className="share-items">
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Facebook"><i><FaFacebookSquare /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Line"><i><FaLine /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="LinkedIn"><i><FaLinkedin /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Mail"><i><IoMail /></i></a></li>
          <li><a target="_blank" href="https://www.facebook.com" rel="noopener noreferrer" title="Print"><i><FaPrint /></i></a></li>
        </ul>
      </div>
    </div>
  );
};
