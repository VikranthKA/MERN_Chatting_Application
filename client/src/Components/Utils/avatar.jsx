import React from 'react';

const Avatar = ({ userId, username }) => { 
  const colors = [
    '#F87171', '#FBBF24', '#FCD34D', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#10B981', 
    '#6EE7B7', '#93C5FD', '#818CF8', '#F9A8D4', '#FB7185', '#FDE68A', '#A3E635', '#6EE7B7', 
    '#67E8F9', '#7DD3FC', '#C084FC', '#D8B4FE', '#E879F9', '#FB923C', '#FACC15', '#4ADE80', 
    '#A5F3FC', '#F472B6'
  ];

  const getColorForUsername = (username) => {
    const firstLetter = username[0].toUpperCase();
    const index = firstLetter.charCodeAt(0) - 65;
    return colors[index] || '#D1D5DB'
  };

  const backgroundColor = getColorForUsername(username);

  return (
    <div className='w-8 h-8 rounded-full flex items-center' style={{ backgroundColor }}>
      <div className='text-center w-full text-white font-bold'>
        {username[0].toUpperCase()}
        
      </div>
    </div>
  );
};

export default Avatar;

