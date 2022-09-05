import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from "../heroesList/heroesSlice";
import store from "../../store";
import { selectAll } from "../heroesFilters/filtersSlice";

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDesc, setHeroDesc] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const { filtersLoadingStatus } = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSunbmitHendler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDesc,
            element: heroElement
        }

        // Відправлення даних насервер в форматі JSON
        // Тільки якщо запит успісний відправляємо песонажа в store

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'complete'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err))

        // Очищаєм форму після відправки

        setHeroName('')
        setHeroDesc('')
        setHeroElement('')

    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка елемментів</option>
        } else if (status === 'error') {
            return <option>Сталась помилка</option>
        }

        // якщо є фільтер то рендери
        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {

                // eslint-disable-next-line
                if (name === 'all') return

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSunbmitHendler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">The name of the new hero</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="What's my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="What can I do?"
                    style={{ "height": '130px' }}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose a hero element</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >My superpower is...</option>
                    {renderFilters(filters, filtersLoadingStatus)}

                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;