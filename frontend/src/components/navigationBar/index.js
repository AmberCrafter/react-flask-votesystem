import './index.css'

function NavigationBar(props) {
    return (
        <div className="navibar">
            <button className="item" onClick={()=>{props.setter(props.pages.votePage)}}>投票</button>
            <button className="item" onClick={()=>{props.setter(props.pages.staticPage)}}>統計資料</button>
            <button className="item" onClick={()=>{props.setter(props.pages.controlPage)}}>管理台</button>
        </div>
    )
}

export default NavigationBar;