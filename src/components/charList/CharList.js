import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
    newItemsLoading: false,
    offset: 2000,
    charEnded: false,
  };

  marvelService = new MarvelService();

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  makeCharList = () => {
    this.marvelService
      .getAllCharacters()
      .then((res) =>
        this.setState({
          charList: res,
          loading: false,
          offset: this.state.offset + 9,
        })
      )
      .catch(this.onError);
  };

  componentDidMount() {
    this.makeCharList();
  }

  onRepeatRequest = (offset) => {
    let ended = false;

    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then((res) => {
        if (res.length < 9) {
          ended = true;
        }

        this.setState(({ charList, offset }) => ({
          charList: [...charList, ...res],
          loading: false,
          newItemsLoading: false,
          offset: offset + 9,
          charEnded: ended,
        }));
      })
      .catch(this.onError);
  };

  onCharLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  render() {
    const { charList, error, loading, offset, newItemsLoading, charEnded } =
      this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingStatus = loading ? <Spinner /> : null;

    const content = !(errorMessage || loadingStatus) ? (
      <div className="char__list">
        <ul className="char__grid">
          {charList.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => this.props.changeSelectedChar(item.id)}
                className="char__item"
              >
                <img
                  src={item.thumbnail}
                  className={
                    item.thumbnail ==
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                      ? "char__item__notimg"
                      : "char__item__img"
                  }
                  alt="abyss"
                />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}
        </ul>

        {charEnded ? (
          <button className="char__notchar inner">
            Извините, больше персонажей нет!
          </button>
        ) : (
          <button
            disabled={newItemsLoading}
            className="button button__main button__long"
            // style={{ display: charEnded ? "none" : "block" }}
            onClick={() => {
              this.onRepeatRequest(offset);
            }}
          >
            <div className="inner">Показать больше</div>
          </button>
        )}
      </div>
    ) : null;

    return (
      <>
        {errorMessage}
        {loadingStatus}
        {content}
      </>
    );
  }
}

export default CharList;
