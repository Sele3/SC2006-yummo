import React from 'react';
import axios from 'axios';
import './PersonList.css';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
        <><div className="PersonList">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                {this.state.persons.map(person => {
                    return (
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.phone}</td>
                            <td>{person.email}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
        </>
    )
  }
}