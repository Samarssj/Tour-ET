import React, { useEffect, useState } from "react";
import { FaSearch, FaStar, FiMapPin } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";
import { useAuthContext } from "../customHook/useAuthContext.js";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
  AiTwotoneLike,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const getBackendUrl = () =>
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api").replace(/\/$/, "");

function Review({ unique }) {
  const [reviews, setReviews] = useState([]);
  const { user: realUser } = useAuthContext();

  const fetchReview = async () => {
    const response = await fetch(
      `${getBackendUrl()}/package/${unique}/comment`,
      realUser?.token
        ? { headers: { Authorization: `Bearer ${realUser.token}` } }
        : undefined
    );
    const result = await response.json();

    if (response.ok) {
      setReviews(result.data);
    }
  };
  useEffect(() => {
    fetchReview();
  }, [unique, realUser?.token]);

  if (reviews.length === 0) {
    return <h3 className="py-3">No review for this package. Be the first</h3>;
  }

  return (
    <div className="review py-5 container">
      <div
        className="col-md-6 scrollable-div"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {reviews.map((review, idx) => {
          return (
            <div key={idx}>
              <EachReview key={review._id} {...review} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const EachReview = ({ _id, user, text, like, dislike, rating, viewerReaction }) => {
  const { user: realUser } = useAuthContext();
  const initialReaction = viewerReaction || (
    realUser?.detail?.likedComment?.some((id) => String(id) === String(_id))
      ? "like"
      : realUser?.detail?.dislikedComment?.some((id) => String(id) === String(_id))
        ? "dislike"
        : "none"
  );

  const [liked, setLike] = useState(initialReaction === "like");
  const [disliked, setDislike] = useState(initialReaction === "dislike");
  const [likeNO, setLiked] = useState(like || 0);
  const [dislikeNO, setDisliked] = useState(dislike || 0);
  const [reactionError, setReactionError] = useState("");

  const updateReaction = async (reaction) => {
    if (!realUser?.token) {
      setReactionError("Please login to react to a review.");
      return;
    }

    setReactionError("");
    try {
      const response = await fetch(`${getBackendUrl()}/comment/${_id}/reaction`, {
        method: "PATCH",
        body: JSON.stringify({ reaction }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${realUser.token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg || "Unable to save your reaction.");
      }

      setLike(result.reaction === "like");
      setDislike(result.reaction === "dislike");
      setLiked(result.data.like || 0);
      setDisliked(result.data.dislike || 0);
    } catch (error) {
      setReactionError(error.message);
    }
  };

  const handelLike = () => updateReaction(liked ? "none" : "like");
  const handelDislike = () => updateReaction(disliked ? "none" : "dislike");
  // const star = Array(parseInt(rating)).fill(0);

  return (
    <>
      <article className=" shadow rounded m-3">
        <div className="">
          <div className="px-5 py-3 d-flex justify-content-between ">
            <div className="left-one">
              <FaUserCircle style={{ fontSize: "30px" }} />
              <span className="text-capitalize fw-bold fs-5">{user} </span>
            </div>
            <div className="right-one">
              <span className="like">
                {!liked && <AiOutlineLike onClick={handelLike} />}
                {liked && <AiTwotoneLike onClick={handelLike} />}
                <span>{likeNO}</span>
                {!disliked && <AiOutlineDislike onClick={handelDislike} />}{" "}
                {disliked && <AiTwotoneDislike onClick={handelDislike} />}
                <span>{dislikeNO}</span>
                {reactionError && <small className="text-danger d-block">{reactionError}</small>}
              </span>
            </div>
          </div>

          {/* <div className="star text-start ms-5">
            {star.map((s) => {
              return <FaStar />;
            })}
          </div> */}
        </div>
        <div className="body text-start px-5 py-3">
          <p>{text} </p>
        </div>
      </article>
    </>
  );
};

export default Review;
