import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

const CharInfo = () => {
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={thor} alt="abyss"/>
                <div>
                    <div className="char__info-name">Тор</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">Домашняя страница</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Вики</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            В скандинавской мифологии Локи — бог или ётунн (или и то, и другое). Локи — сын Фарбаути и Лауфея, брат Хельблинди и Билейстра. По йотуну Ангрбоде Локи является отцом Хель, волка Фенрира и мирового змея Ёрмунганда. Согласно Сигюн, Локи является отцом Нари и/или Нарфи, а от жеребца Свадильфари в качестве отца Локи родил - в форме кобылы - восьминогого коня Слейпнира. Кроме того, Локи упоминается как отец Вали в Прозаической Эдде. 
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                Команда всех победителей: Группа героев (2011) #3
                </li>
                <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li>
            </ul>
        </div>
    )
}

export default CharInfo;