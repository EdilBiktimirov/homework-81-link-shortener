import React, {ChangeEvent, FormEvent, useState} from 'react';
import {addShortUrl} from "../shortUrlThunks";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectLoading, selectUrl} from "../shortUrlSlice";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import type {UrlMutation} from "../../../types";

const UrlForm = () => {
  const dispatch = useAppDispatch();
  const currentUrl = useAppSelector(selectUrl);
  const loading = useAppSelector(selectLoading);

  const [state, setState] = useState<UrlMutation>({
    shortUrl: '',
    originalUrl: '',
  });

  const [show, setShow] = useState('none');

  const getRandomId = () => {
    let result = '';
    const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const max_position = words.length - 1;
    for (let i = 0; i < 7; i++) {
      const position = Math.floor(Math.random() * max_position);
      result = result + words.substring(position, position + 1);
    }
    return result;
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prev) => ({...prev, [name]: value}));
    setState((prev) => ({...prev, shortUrl: getRandomId()}));
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(addShortUrl(state));
    setState((prev) => ({...prev, shortUrl: '', originalUrl: ''}));
    setShow('block');
  };

  return (
    <Form onSubmit={onFormSubmit} className="text-center p-3">
      <h2 className="text-secondary">Shorten your link!</h2>
      <Form.Group className="mb-3">
        <Form.Control
          className="text-center"
          type="url"
          placeholder="Enter URL here"
          name="originalUrl"
          value={state.originalUrl}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Button
        variant="outline-primary"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Loading…' : 'Shorten!'}
      </Button>
      <div style={{display: show}} className="mt-4">
        <h3 className="text-secondary">Your link now looks like this:</h3>
        {currentUrl && <Link
            to={'http://localhost:8000/' + currentUrl.shortUrl}
            className="text-decoration-none text-success"
        >
          {'http://localhost:8000/' + currentUrl.shortUrl}
        </Link>}
      </div>
    </Form>
  );
};

export default UrlForm;