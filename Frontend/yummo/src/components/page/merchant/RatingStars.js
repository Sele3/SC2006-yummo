import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import styles from "./RatingStars.module.css";

function RatingStars({ rating }) {
  const numFullStars = Math.floor(rating);
  const numHalfStars = rating - numFullStars > 0 ? 1 : 0;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  return (
    <div className={styles.stars}>
      {Array(numFullStars)
        .fill()
        .map((_, i) => (
          <StarIcon key={i} />
        ))}
      {Array(numHalfStars)
        .fill()
        .map((_, i) => (
          <StarHalfIcon key={i} />
        ))}
      {Array(numEmptyStars)
        .fill()
        .map((_, i) => (
          <StarBorderIcon key={i} />
        ))}
    </div>
  );
}

export default RatingStars;