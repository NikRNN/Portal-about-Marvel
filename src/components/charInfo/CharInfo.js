import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  loadingStatus = () => {
    this.setState({ ...this.state, loading: true });
  };

  onError = () => {
    this.setState({ ...this.state, error: true, loading: false });
  };

  updateChar = () => {
    const id = this.props.charInfo;

    if (!id) {
      return;
    }
    this.loadingStatus();
    this.marvelService
      .getSingleCharacter(id)
      .then((res) => this.setState({ char: res, loading: false }))
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charInfo !== prevProps.charInfo) {
      this.updateChar();
    }
  }

  render() {
    const { error, loading, char } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingStatus = loading ? <Spinner /> : null;
    const content = !(errorMessage || loadingStatus || !char) ? (
      <View char={char} />
    ) : null;
    const skeleton =
      errorMessage || loadingStatus || content ? null : <Skeleton />;

    return (
      <div className="char__info">
        {errorMessage}
        {loadingStatus}
        {skeleton}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt="abyss"
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { width: 150, height: 150, objectFit: "contain" }
              : { width: 150, height: 150, objectFit: "cover" }
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Домашняя страница</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Вики</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">
        {comics.length !== 0 ? "Комиксы:" : null}
      </div>
      <ul className="char__comics-list">
        {comics.map((item, i) => {
          return (
            <li className="char__comics-item" key={i}>
              {i + 1}. {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
