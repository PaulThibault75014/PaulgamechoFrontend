import styles from '../styles/AllReleases.module.css';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function AllReleases() {

  const [latestGamesData, setLatestGamesData] = useState([]);
  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

  // useEffect pour éviter un infinite re-render (préconisation React)
  // exploitation des données reçues de l'API: data.results >>name & background_image
  // On map sur le tableau results pour retourner les données souhaitées.

  useEffect(() => {
    const fetchLatestGames = async () => {
      const response = await fetch('http://localhost:3000/games/latestreleased', {
        cache: "force-cache",
      })
      if (!response.ok) {
        console.log("Response latestreleased was not ok");
        return;
      }
      const data = await response.json();
      if (!data.latestgames) {
        console.log("Invalid ddata latestgames", data);
        return;
      }
      console.log("DATA LASTESTGAMES ", data.latestgames)
      setLatestGamesData(data.latestgames.slice(0, 20));
    }
    fetchLatestGames();
  }, []);
  //FONCTION LIKE EXTERNE POUR L'APPELER AILLEUR SANDRINE
  const isAddedToWishlist = (game, wishlist) => {
    return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
  }
  const latestReleases = latestGamesData.map((game, index) => {
    // const isAddedToWishlist = wishlist.some(
    //   (wishlistItem) => wishlistItem.name === game.name
    // );
    let iconStyle = {};
    if (isAddedToWishlist) {
      iconStyle = {
        backgroundColor: "#CF55ED",
      };
    }
    return (
      <>

        <div
          key={game.name}
          isAddedToWishlist={isAddedToWishlist}
          className={styles.card}
          style={{ backgroundImage: `url(${game.imageGame})`, }}
        >
          <p className={styles.gameNameCard}>{game.name}</p>

          <button className={styles.iconButton} style={iconStyle} onClick={() => handleWishlistClick(game)}>
            <Image
              src="/icons/heart.svg"
              alt="Add to wishlist"
              width={24}
              height={24}
              className={styles.likeIcon}
            />
          </button>

        </div>

      </>
    )
  });
  /////FIN TEST LASTEST RELEASES SANDRINE


      return (
        <div className={isLightmode ? styles.containerlight : styles.containerdark}>
          <div className={styles.middleContainer}>



    
            {/*SECTION LATEST RELEASES*/}
            {latestGamesData && (
              <>
                <h2 className={styles.sectionTitle}>Latest releases</h2>
                <div className={styles.contentCard}>{latestReleases}</div>
                <Link href="/all-releases">
                  <button className={styles.secondaryButton}>
                    See all search releases
                  </button>
                </Link>
              </>
            )}
    
          </div>
        </div>
      );
    }

export default AllReleases;