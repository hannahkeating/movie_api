import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Container>
        <div className="director-view">
          <Card>
            <br></br>
            <br></br>
            <Row>
              <Col xs={1}></Col>
              <Col>
                <span>{director.Name}</span>
              </Col>
              <Col xs={8}>
                <span>{director.Bio}</span>
                <span>{director.Birthyear}</span>
              </Col>
            </Row>
            <br />
            <Row>
              <Link to={`/`}>
                <Button variant="dark link">Back</Button>
              </Link>
            </Row>
            <br />
            <br />
          </Card>
        </div>
      </Container>
    );
  }
}
