import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from 'react-trello';
import axios from 'axios';
import ExtCard from "./componets/ExtCard";
import ExtNewCardForm from "./componets/ExtCardForm";

const components = {
    Card: ExtCard,
    NewCardForm: ExtNewCardForm
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true
        };
    }

    componentDidMount() {
        axios.get('/api/cards').then(
            data => {
                this.setState({ data: data.data, loading: false});
            });
    }

    render() {
        const loading = this.state.loading;
        return (
            <section>
                {loading ? (
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
                ) : (
                    <Board data={this.state.data}
                           draggable={true}
                           editable={true}
                           canAddLanes={true}
                           editLaneTitle={true}
                           editCard={true}
                           components={components}
                    />
                )
                }
            </section>
    );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
