import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import styles from "./RestaurantOverview.module.css";
import { fetchReservations, fetchReviews, useMerchantStore } from "./store";
import { assetUrl } from "./utils";

function RestaurantOverview() {
  const [upcoming, setUpcoming] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = useMerchantStore((state) => state.token);
  const selectedRestaurant = useMerchantStore(
    (state) => state.selectedRestaurant
  );

  useEffect(() => {
    fetchReservations(selectedRestaurant.resID, token).then(({ upcoming }) => {
      setUpcoming(upcoming);
    });

    fetchReviews(selectedRestaurant.resID, token).then((reviews) => {
      setReviews(reviews);
    });
  }, [token, selectedRestaurant]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div>{selectedRestaurant.address}</div>
          <div className={styles.name}>
            <h1>{selectedRestaurant.name}</h1>
          </div>
          <RatingStars rating={selectedRestaurant.avg_rating} />
        </div>

        <div className={styles.image}>
          <img
            src={assetUrl(selectedRestaurant.img)}
            alt={`${selectedRestaurant.name} at ${selectedRestaurant.address}`}
          />
        </div>
      </div>

      <div className={styles.overview}>
        <div className={styles.reviews}>
          <h2>Recent reviews</h2>

          {reviews.length === 0 ? (
            <p>No one has left a review yet...</p>
          ) : (
            <ul className={styles.reviews}>
              {reviews.map((review) => (
                <li key={review.review_id} className={styles.review}>
                  <div className={styles.rating}>
                    <img
                      src={assetUrl(review.customer_icon)}
                      alt={review.customer_name}
                      className={styles.avatar}
                    />
                    <span>
                      <span className={styles.reviewerName}>
                        {review.customer_name}
                      </span>{" "}
                      rated
                    </span>
                    <RatingStars rating={review.rating} />
                  </div>
                  <div className={styles.description}>{review.description}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.reservations}>
          <h2>Upcoming reservations</h2>

          {upcoming.length === 0 ? (
            <p>You have no upcoming reservations</p>
          ) : (
            <ol className={styles.upcoming}>
              {upcoming.map((reservation) => (
                <li className={styles.reservation} key={reservation.reservID}>
                  <div className={styles.reservationDetails}>
                    <span className={styles.customerName}>
                      {reservation.customer_name}
                    </span>
                    <span className={styles.pax}>
                      <span>
                        <EmojiPeopleIcon />
                      </span>
                      <span>{reservation.pax}</span>
                    </span>
                  </div>
                  <div className={styles.date}>
                    {new Date(reservation.reserved_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantOverview;