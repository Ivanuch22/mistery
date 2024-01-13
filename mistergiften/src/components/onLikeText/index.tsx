import React from "react";

interface LikeText {
  name: string;
  classLikeText: string;
}
const OnLikeText: React.FC<LikeText> = ({ classLikeText, name }) => {
  return (
    <div className={`LikeText ${classLikeText}`}>{name} додано у вибране</div>
  );
};

export default OnLikeText;
