import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  state = {
    charList: [],
    error: null,
    loading: true,
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
        })
      )
      .catch(this.onError);
  };

  componentDidMount() {
    this.makeCharList();
  }

  render() {
    const { charList, error, loading } = this.state;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {charList.map((item) => {
            return (
              <li className="char__item">
                <img src={item.thumbnail} alt="abyss" />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}

          {/* <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item char__item_selected">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li> */}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">Показать больше</div>
        </button>
      </div>
    );
  }
}

export default CharList;
