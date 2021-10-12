import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap"

import '../App.css';
import { v4 } from "uuid";
import CategoryCard from './CategoryCard';
import * as CategoryAction from "../redux/action/CategoryAction";

export default function Category() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { listCategory, loading, success } = useSelector((state) => state.listCategory);
  const [showaddCat, setShowAddCat] = useState(false)
  const dispatch = useDispatch();
  const titleCat = useRef();
  const descCat = useRef();

  useEffect(() => {
    if ((success && initialLoading)) {

      setInitialLoading(false);
    } else {
      dispatch(CategoryAction.listCategorys(initialLoading));

    }

  }, []);

  const addCat = () => {
    setShowAddCat(false)
    const data = {
      title: titleCat.current.value,
      description: descCat.current.value
    }
    dispatch(CategoryAction.createCategory(data))
    setTimeout(() => {
      dispatch(CategoryAction.listCategorys(true));

    }, 200)
  }
  const ClaseAddCat = () => {
    setShowAddCat(false)
    console.log(titleCat.current.value)
    titleCat.current.value = ""
    descCat.current.value = ""

  }
  return (
    <div>
      <h2>Categories</h2>
      <div class="category-section">
        {(listCategory) ? listCategory.map((category, index) => {
          return (
            <div>
              <CategoryCard category={category} index={index} />
            </div>
          )
        }) : ""}

        {(showaddCat) ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="title" ref={titleCat} placeholder="Category Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" ref={descCat} placeholder="Category Description" rows={3} />
            </Form.Group>
            <div className="container">
              <div className="row">
                <div className="col">
                  <button onClick={addCat} class="btn btn-outline-info" style={{ width: "100%" }}>
                    +
                  </button></div>
                <div className="col">
                  <button onClick={ClaseAddCat} class="btn btn-outline-danger" style={{ width: "100%" }}>
                    -
                  </button>
                </div>
              </div>
            </div>

          </Form>) : (
          <button onClick={() => { setShowAddCat(true) }} class="btn btn-outline-success" style={{ width: "100%" }}>
            + ADD CATEGORY
          </button>
        )}

      </div>
    </div>
  )
};