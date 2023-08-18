import { createContext, useState } from "react";

export const BulletinContext = createContext({
  bulletins: [],
  addBulletin: () => {},
  deleteBulletin: () => {},
  toggleLike: () => {},
  addComment: () => {},
});

function BulletinContextProvider({ children }) {
  const [bulletins, setBulletins] = useState([]);

  const addBulletin = (newBulletin) => {
    newBulletin.comments = [];
    setBulletins((prevBulletins) => [newBulletin, ...prevBulletins]);
  };

  const deleteBulletin = (bulletinId) => {
    // 게시물 삭제
    setBulletins((prevBulletins) =>
      prevBulletins.filter((bulletin) => bulletin.id !== bulletinId)
    );
  };

  const toggleLike = (bulletinId) => {
    setBulletins((prevBulletins) =>
      prevBulletins.map((bulletin) =>
        bulletin.id === bulletinId
          ? {
              ...bulletin,
              isRecommend: !bulletin.isRecommend,
              recommend: bulletin.isRecommend
                ? bulletin.recommend - 1
                : bulletin.recommend + 1,
            }
          : bulletin
      )
    );
  };

  const addComment = (bulletinId, newComment) => {
    setBulletins((prevBulletins) =>
      prevBulletins.map((bulletin) =>
        bulletin.id === bulletinId
          ? {
              ...bulletin,
              comments: [...bulletin.comments, newComment],
              comment: bulletin.comment + 1, // Increase comment count
            }
          : bulletin
      )
    );
  };
  const value = {
    bulletins,
    addBulletin,
    deleteBulletin,
    toggleLike,
    addComment,
  };

  return (
    <BulletinContext.Provider value={value}>
      {children}
    </BulletinContext.Provider>
  );
}

export default BulletinContextProvider;
