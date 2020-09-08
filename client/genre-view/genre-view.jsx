import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container>
        <div className="genre-view">
          <Card>
            <br />
            <br />
            <Card.Header className="text-center">{genre.Name}</Card.Header>
            <br />
            <Row>
              <Col className="text-center">
                <span>{genre.Description}</span>
              </Col>
              <Col xs={1}></Col>
            </Row>
            <br />
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
