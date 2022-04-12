function useRestaurants(userId) {
  const [restaurants, setRestaurants] = React.useState([])

  React.useEffect(() => {
      fetch(`/userRestaurants/${userId}`)
          .then((response) => response.json())
          .then((data) => {
              setRestaurants(data)
          });
  }, [userId]);

  return restaurants
}