import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  ReviewAuthor,
  ReviewContainer,
  ReviewContent,
  ReviewForm,
  ReviewInput,
  ReviewSubmitButton,
} from "./Reviews.styled";
import { addDataToMockAPI, fetchDataFromMockAPI } from "../fakeApi";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Loader } from "./Loader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewContent, setNewReviewContent] = useState("");
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReviews = await fetchDataFromMockAPI("reviews");
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Помилка при отриманні перевезень:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleReviewAuthorChange = (event) => {
    setNewReviewAuthor(event.target.value);
  };

  const handleReviewContentChange = (event) => {
    setNewReviewContent(event.target.value);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (newReviewAuthor.trim() !== "" && newReviewContent.trim() !== "") {
      const newReview = {
        id: nanoid(),
        author: newReviewAuthor,
        content: newReviewContent,
      };
      addDataToMockAPI(newReview, "reviews");
      setReviews([...reviews, newReview]);
      setNewReviewAuthor("");
      setNewReviewContent("");
    }
  };

  return (
    <section>
      <div>
        <h2>Відгуки</h2>
        {isloading && <Loader />}
        {reviews.map((review) => (
          <ReviewContainer key={review.id}>
            <ReviewAuthor>{review.author}</ReviewAuthor>
            <ReviewContent>{review.content}</ReviewContent>
          </ReviewContainer>
        ))}
        <ReviewForm onSubmit={handleReviewSubmit}>
          <ReviewInput
            type="text"
            placeholder="Ваше ім'я"
            value={newReviewAuthor}
            onChange={handleReviewAuthorChange}
            required
          />
          <ReviewInput
            type="text"
            placeholder="Ваш відгук"
            value={newReviewContent}
            onChange={handleReviewContentChange}
            required
          />
          <ReviewSubmitButton type="submit">
            Надіслати відгук <ReviewsIcon style={{ marginLeft: "20px" }} />
          </ReviewSubmitButton>
        </ReviewForm>
      </div>
    </section>
  );
};
export default Reviews;
