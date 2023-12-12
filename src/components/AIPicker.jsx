import React from "react";

import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generateingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Enter your prompt here..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generateingImg ? (
          <CustomButton type="outline" title="Asking AI..." customStyle="text-xs" />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyle="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyle="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
