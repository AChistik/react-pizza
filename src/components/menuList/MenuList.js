import PizzaBlock from "../pizzaBlock/PizzaBlock";

function pizzaItems() {
    let items = [];

    for (let i = 0; i < 9; i++) {
        items.push(<PizzaBlock title={'Чизбургер-пицца'} price={395 + 10 * i} />)
    }


    return items
}

function MenuList() {
    return (
        <div className="content__items">
            {pizzaItems()}
        </div>
    )
}

export default MenuList;