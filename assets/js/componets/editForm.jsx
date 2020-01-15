import React, {Component} from 'react';
import {Form, Button, Jumbotron} from "react-bootstrap";
import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import { connect } from 'react-redux';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: false,
            title: this.props.title,
            description: this.props.description,
            expired: this.props.expired
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const editedCard = {
            id: this.props.id,
            title: (this.state.title ? this.state.title : ''),
            description: (this.state.description ? this.state.description : ''),
            expired: (this.state.expired ? this.state.expired : '')
        };
        const total = this.props.total;

        console.log({ total, editedCard });
        axios.post('/api/lanes/reset', { total, editedCard })
            .then(res => {
                if(res.status === 200) {
                    window.location.reload();
                } else {
                    this.setState({ error: true});
                }
            });
    };

    render() {
        return (
            <Jumbotron>
                { this.state.error ? (
                    <Alert variant={'warning'}>
                        Something went wrong. Try again later.
                    </Alert>
                ) : (
                    this.state.error
                )}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={this.props.title}
                                onChange={(event) => {
                                    this.setState( {title: event.target.value})
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                defaultValue={this.props.description}
                                onChange={(event) => {
                                    this.setState( {description: event.target.value})
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="expiredAt">
                            <Form.Label>expired At</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={this.props.expired}
                                onChange={(event) => {
                                    this.setState( {expired: event.target.value})
                                }}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type={"submit"}
                        >
                            Save Changes
                        </Button>
                    </Form>
            </Jumbotron>
        );
    }
}

function mapStateToProps (state) {
    return {
        total: state
    }
}

export default connect(mapStateToProps)(EditForm);
