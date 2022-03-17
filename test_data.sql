--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-2.pgdg20.04+1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.recommendations (
    recc_id integer NOT NULL,
    rest_id integer,
    user_id integer,
    comment text
);


ALTER TABLE public.recommendations OWNER TO hackbright;

--
-- Name: recommendations_recc_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.recommendations_recc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendations_recc_id_seq OWNER TO hackbright;

--
-- Name: recommendations_recc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.recommendations_recc_id_seq OWNED BY public.recommendations.recc_id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.restaurants (
    rest_id integer NOT NULL,
    yelp_id character varying(50) NOT NULL,
    rest_name character varying(50) NOT NULL,
    rest_addy character varying(50) NOT NULL,
    rest_city character varying(50) NOT NULL,
    rest_zip integer NOT NULL
);


ALTER TABLE public.restaurants OWNER TO hackbright;

--
-- Name: restaurants_rest_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.restaurants_rest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_rest_id_seq OWNER TO hackbright;

--
-- Name: restaurants_rest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.restaurants_rest_id_seq OWNED BY public.restaurants.rest_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    fname character varying(50) NOT NULL,
    lname character varying(50) NOT NULL,
    email character varying NOT NULL,
    home_zip integer NOT NULL,
    profile_pic character varying,
    password character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: recommendations recc_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN recc_id SET DEFAULT nextval('public.recommendations_recc_id_seq'::regclass);


--
-- Name: restaurants rest_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN rest_id SET DEFAULT nextval('public.restaurants_rest_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.recommendations (recc_id, rest_id, user_id, comment) FROM stdin;
1	1	1	A testing comment for a tested restaurant by a tested user
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.restaurants (rest_id, yelp_id, rest_name, rest_addy, rest_city, rest_zip) FROM stdin;
1	123456789098765432123456	A Test Restaurant	123 Test St	Gotham City	94107
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.users (user_id, fname, lname, email, home_zip, profile_pic, password) FROM stdin;
1	Test	Tester	test@test.test	94107	\N	test
\.


--
-- Name: recommendations_recc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.recommendations_recc_id_seq', 1, true);


--
-- Name: restaurants_rest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.restaurants_rest_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (recc_id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (rest_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: recommendations recommendations_rest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_rest_id_fkey FOREIGN KEY (rest_id) REFERENCES public.restaurants(rest_id);


--
-- Name: recommendations recommendations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

