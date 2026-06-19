import React from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
      <Picker 
        onEmojiClick={onEmojiClick}
        theme="light"
        searchDisabled={false}
        skinTonesDisabled={true}
        height={350}
        width={300}
        previewConfig={{
          showPreview: false
        }}
        style={{
          backgroundColor: 'white',
          borderColor: 'transparent'
        }}
      />
    </div>
  );
};

export default EmojiPicker;
