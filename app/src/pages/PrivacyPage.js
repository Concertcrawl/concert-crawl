import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const PrivacyPage = () => {
  return (
    <>
      <Container className="border border-dark  mb-5 mt-5">
        <Row>
          <Col xs={12} className="p-0">
            <h1 fluid className="text-center mt-3 border-bottom border-dark"> Privacy Page </h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="ml-3">
            <img src="https://via.placeholder.com/200" alt="placeholder"/>
          </Col>
          <Col xs={9} className="pb-5">
            <p>
              Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean
              collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
            </p>
            <p>
              Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach
              avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin
              horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss
              chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss
              chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean
              chickweed potato bell pepper artichoke.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}
