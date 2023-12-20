import { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/searchIcon.svg";
import namNamIcon from "../assets/namNamIcon.svg";
import burgerMenuIcon from "../assets/burgerMenuIcon.svg";
import goNamNam from "../assets/GO.svg";
import "./style/Navbar.scss";

function activateSearchBar() {
  const searchBar = document.getElementsByClassName("SearchBarMobile");
  const burgerMenu = document.getElementsByClassName("BurgerMenu");
  searchBar[0].classList.toggle("SearchBarMobileActive");
  if (burgerMenu[0].classList.contains("BurgerMenuActive")) {
    burgerMenu[0].classList.toggle("BurgerMenuActive");
  }
}

function activateBurgerMenu() {
  const burgerMenu = document.getElementsByClassName("BurgerMenu");
  const searchBar = document.getElementsByClassName("SearchBarMobile");
  burgerMenu[0].classList.toggle("BurgerMenuActive");
  if (searchBar[0].classList.contains("SearchBarMobileActive")) {
    searchBar[0].classList.toggle("SearchBarMobileActive");
  }
}

function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="Navbar">
        <button
          type="button"
          onClick={() => activateSearchBar()}
          className="SearchButton"
        >
          <img src={searchIcon} alt="Rechercher" className="SearchIcon" />
        </button>
        <Link to="/home">
          <img src={namNamIcon} alt="Page d'Accueil" className="HomeIcon" />
        </Link>
        <div className="RightSide">
          <form action="#" className="SearchBar SearchBarDesktop">
            <input
              type="search"
              placeholder="Entrer votre recherche ici..."
              className="SearchInput DesktopInput"
              name="Rechercher"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <button type="button" className="GoButton">
              <img src={goNamNam} alt="Rechercher" className="GoIcon" />
            </button>
          </form>
          <button
            type="button"
            onClick={() => activateBurgerMenu()}
            className="BurgerButton"
            name="Rechercher"
          >
            <img src={burgerMenuIcon} alt="Menu" className="BurgerIcon" />
          </button>
        </div>
      </div>

      <form action="#" className="SearchBar SearchBarMobile">
        <input
          type="search"
          placeholder="Entrer votre recherche ici..."
          className="SearchInput MobileInput"
          name="Rechercher"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <button type="button" className="GoButton">
          <img src={goNamNam} alt="Rechercher" className="GoIcon" />
        </button>
      </form>

      <div className="BurgerMenu">
        <ul>
          <li>
            <a href="/Connexion">
              Connexion
              <br />
              ou
              <br />
              Inscription
            </a>
          </li>
          <li>
            <a href="/recipes">Voir les recettes</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
