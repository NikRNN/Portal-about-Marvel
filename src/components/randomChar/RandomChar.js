import "./randomChar.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  state = {
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.marvelService
      .getSingleCharacter(id)
      .then((res) => {
        this.setState(res);
      })
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateChar();
  }

  render() {
    const { name, description, thumbnail, homepage, wiki, loading, error } =
      this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingStatus = loading ? <Spinner /> : null;
    const content = !(errorMessage || loadingStatus) ? (
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className={
            thumbnail ==
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? "randomchar__notimg"
              : "randomchar__img"
          }
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {loadingStatus}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={() => {
              this.updateChar();
              this.setState({ loading: true });
            }}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
