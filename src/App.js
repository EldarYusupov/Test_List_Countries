import React, {useState, useEffect} from 'react';

const ListItems = ({ items, onCountryClick }) => (
    <ul>
        {items.map(item => <li style={{ cursor: 'pointer' }} key={item.countryCode} onClick={() => onCountryClick(item)}>{item.name}</li>)}
    </ul>
)

const App = () => {
    const [initialCountries, setInitialCountries] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountryHolidays, setSelectedCountryHolidays] = useState([]);
    const [isAscSorting, setIsAscSorting] = useState(true)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://date.nager.at/api/v3/AvailableCountries')
            const countriesList = await response.json()
            setInitialCountries(countriesList)
            setCountries(countriesList)
        }
        fetchData()
    }, [])

    const onSearch = (e) => {
        const { value } = e.target;

        setSearchText(value);

        if (!value) {
            return setCountries([...initialCountries])
        }

        const filteredCountries = [...initialCountries].filter(country => {
            return country.name.toLowerCase().includes(value.toLowerCase())
        })

        setCountries(filteredCountries)
    }

    const onCountryClick = async ({ countryCode }) => {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`)
        const holidays = await response.json()

        setSelectedCountryHolidays(holidays)
    }

    const onSort = () => {
        const sortedCountries = [...initialCountries].sort((a, b) => {
            if (a.name > b.name) {
                return isAscSorting ? -1 : 1;
            }

            if (b.name > a.name) {
                return isAscSorting ? 1 : -1;
            }

            return 0;
        })

        setCountries(sortedCountries)
        setIsAscSorting(!isAscSorting)
    }

    const onReset = () => {
        setCountries([...initialCountries])
        setSearchText('');
        setSelectedCountryHolidays([])
    }

    return (
        <div className="container">
            <h1>React Test</h1>
            <div className="body">
                <div className="search-area">
                    <section className="search-field" >
                        <label for="search">Search text</label>
                        <input value={searchText} id="search" type="text" onChange={onSearch} />

                        <button onClick={onSort}>
                            Sort by {isAscSorting ? "Desc" : "Asc"}
                        </button>
                        <button onClick={onReset}>
                            Reset
                        </button>
                    </section>
                    <ListItems items={countries} onCountryClick={onCountryClick}/>
                </div>
                <div className="info-area">
                    <h2>Holiday</h2>
                    <ul>
                        {selectedCountryHolidays.map(({ name }) => <li key={name} style={{listStyleType:''}}>{name}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default App