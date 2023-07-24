--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0
SET lock_timeout = 0
SET idle_in_transaction_session_timeout = 0
SET client_encoding = 'UTF8'
SET standard_conforming_strings = on
SELECT pg_catalog.set_config('search_path', '', false)
SET check_function_bodies = false
SET xmloption = content
SET client_min_messages = warning
SET row_security = off

--
-- Name: set_updated_at() Type: FUNCTION Schema: public Owner: jeremy
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN NEW.updated_at = (now() at time zone 'UTC') RETURN NEW END $$


ALTER FUNCTION public.set_updated_at() OWNER TO jeremy

SET default_tablespace = ''

SET default_table_access_method = heap

--
-- Name: body_composition_categories Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.body_composition_categories (
    body_composition_category_id integer NOT NULL,
    title character varying(45) NOT NULL,
    unit_id integer NOT NULL,
    user_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)


ALTER TABLE public.body_composition_categories OWNER TO jeremy

--
-- Name: body_composition_categories_body_composition_category_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.body_composition_categories_body_composition_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.body_composition_categories_body_composition_category_id_seq OWNER TO jeremy

--
-- Name: body_composition_categories_body_composition_category_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.body_composition_categories_body_composition_category_id_seq OWNED BY public.body_composition_categories.body_composition_category_id


--
-- Name: body_compositions Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.body_compositions (
    body_composition_id integer NOT NULL,
    date timestamp with time zone DEFAULT now(),
    value numeric(5,2) NOT NULL,
    body_composition_category_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)


ALTER TABLE public.body_compositions OWNER TO jeremy

--
-- Name: body_compositions_body_composition_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.body_compositions_body_composition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.body_compositions_body_composition_id_seq OWNER TO jeremy

--
-- Name: body_compositions_body_composition_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.body_compositions_body_composition_id_seq OWNED BY public.body_compositions.body_composition_id


--
-- Name: exercises Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.exercises (
    exercise_id integer NOT NULL,
    title character varying(45) NOT NULL,
    image character varying(45),
    unit_id integer NOT NULL,
    user_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)


ALTER TABLE public.exercises OWNER TO jeremy

--
-- Name: exercises_exercise_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.exercises_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.exercises_exercise_id_seq OWNER TO jeremy

--
-- Name: exercises_exercise_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.exercises_exercise_id_seq OWNED BY public.exercises.exercise_id


--
-- Name: sets Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.sets (
    set_id integer NOT NULL,
    repetitions integer NOT NULL,
    value numeric(4,1) NOT NULL,
    exercise_id integer NOT NULL,
    training_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)


ALTER TABLE public.sets OWNER TO jeremy

--
-- Name: sets_set_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.sets_set_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.sets_set_id_seq OWNER TO jeremy

--
-- Name: sets_set_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.sets_set_id_seq OWNED BY public.sets.set_id


--
-- Name: trainings Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.trainings (
    training_id integer NOT NULL,
    title character varying(45),
    date timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
)


ALTER TABLE public.trainings OWNER TO jeremy

--
-- Name: trainings_training_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.trainings_training_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.trainings_training_id_seq OWNER TO jeremy

--
-- Name: trainings_training_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.trainings_training_id_seq OWNED BY public.trainings.training_id


--
-- Name: units Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.units (
    unit_id integer NOT NULL,
    title character varying(45) NOT NULL,
    user_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)


ALTER TABLE public.units OWNER TO jeremy

--
-- Name: units_unit_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.units_unit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.units_unit_id_seq OWNER TO jeremy

--
-- Name: units_unit_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.units_unit_id_seq OWNED BY public.units.unit_id


--
-- Name: users Type: TABLE Schema: public Owner: jeremy
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
)


ALTER TABLE public.users OWNER TO jeremy

--
-- Name: users_user_id_seq Type: SEQUENCE Schema: public Owner: jeremy
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1


ALTER TABLE public.users_user_id_seq OWNER TO jeremy

--
-- Name: users_user_id_seq Type: SEQUENCE OWNED BY Schema: public Owner: jeremy
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id


--
-- Name: body_composition_categories body_composition_category_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_composition_categories ALTER COLUMN body_composition_category_id SET DEFAULT nextval('public.body_composition_categories_body_composition_category_id_seq'::regclass)


--
-- Name: body_compositions body_composition_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_compositions ALTER COLUMN body_composition_id SET DEFAULT nextval('public.body_compositions_body_composition_id_seq'::regclass)


--
-- Name: exercises exercise_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.exercises ALTER COLUMN exercise_id SET DEFAULT nextval('public.exercises_exercise_id_seq'::regclass)


--
-- Name: sets set_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.sets ALTER COLUMN set_id SET DEFAULT nextval('public.sets_set_id_seq'::regclass)


--
-- Name: trainings training_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.trainings ALTER COLUMN training_id SET DEFAULT nextval('public.trainings_training_id_seq'::regclass)


--
-- Name: units unit_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.units ALTER COLUMN unit_id SET DEFAULT nextval('public.units_unit_id_seq'::regclass)


--
-- Name: users user_id Type: DEFAULT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass)


--
-- Data for Name: body_composition_categories Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.body_composition_categories (body_composition_category_id, title, unit_id, user_id, created_at, updated_at) FROM stdin
1	Poids	1	\N	2023-01-09 11:00:00.771+00	2023-01-09 16:23:23.563082+00
3	Masse graisseuse	3	\N	2023-01-09 14:07:05.683+00	2023-01-09 16:23:23.563082+00
4	Masse musculaire 	3	\N	2023-01-09 14:08:39.814+00	2023-01-09 16:23:23.563082+00
5	Eau	3	\N	2023-01-09 14:09:30.314+00	2023-01-09 16:23:23.563082+00
6	Age	4	\N	2023-01-09 14:10:04.883+00	2023-01-09 16:23:23.563082+00
10	Graisse corporelle	3	\N	2023-01-09 16:38:23.250971+00	2023-01-09 16:38:23.250971+00
11	Taux musculaire	3	\N	2023-01-09 16:38:23.250971+00	2023-01-09 16:38:23.250971+00
12	Poids sans graisse	1	\N	2023-01-09 16:39:40.57335+00	2023-01-09 16:39:40.57335+00
13	Graisse sous-cutanee	3	\N	2023-01-09 16:39:40.57335+00	2023-01-09 16:39:40.57335+00
14	Muscle squelettique	3	\N	2023-01-09 16:39:40.57335+00	2023-01-09 16:39:40.57335+00
\.


--
-- Data for Name: body_compositions Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.body_compositions (body_composition_id, date, value, body_composition_category_id, user_id, created_at, updated_at) FROM stdin
1	2023-01-09 10:59:47.531+00	98.00	1	1	2023-01-09 11:00:03.615+00	2023-01-09 11:00:03.615+00
3	2023-01-07 11:32:09+00	82.20	1	2	2023-01-09 11:32:59.352+00	2023-01-09 11:32:59.352+00
6	2023-01-07 14:05:34+00	39.50	3	2	2023-01-09 14:08:09.273+00	2023-01-09 14:08:09.273+00
7	2023-01-07 14:05:34+00	56.80	4	2	2023-01-09 14:08:51.456+00	2023-01-09 14:08:51.456+00
8	2023-01-07 14:05:34+00	41.50	5	2	2023-01-09 14:09:38.853+00	2023-01-09 14:09:38.853+00
9	2023-01-07 14:05:34+00	31.00	6	2	2023-01-09 14:10:11.301+00	2023-01-09 14:10:11.301+00
\.


--
-- Data for Name: exercises Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.exercises (exercise_id, title, image, unit_id, user_id, created_at, updated_at) FROM stdin
4	Presse		1	\N	2023-01-09 16:43:08.809+00	2023-01-09 16:47:15.453245+00
5	Extension des jambes		1	\N	2023-01-09 16:43:22.589+00	2023-01-09 16:47:15.453245+00
6	Leg curl		1	\N	2023-01-09 16:43:34.517+00	2023-01-09 16:47:15.453245+00
7	Tirage vertical		1	\N	2023-01-09 16:43:42.253+00	2023-01-09 16:47:15.453245+00
8	Rameur (poids)		1	\N	2023-01-09 16:44:21.502+00	2023-01-09 16:47:15.453245+00
9	Gainage		10	\N	2023-01-09 16:44:36.582+00	2023-01-09 16:47:15.453245+00
10	Poulie (Biceps)		1	\N	2023-01-09 16:45:55.709+00	2023-01-09 16:47:15.453245+00
11	Poulie (Triceps)		1	\N	2023-01-09 16:46:02.327+00	2023-01-09 16:47:15.453245+00
12	Abducteurs		1	\N	2023-01-09 16:46:51.308+00	2023-01-09 16:47:15.453245+00
13	Adducteurs		1	\N	2023-01-09 16:46:58.003+00	2023-01-09 16:47:15.453245+00
3	Rameur (temps)		2	\N	2023-01-09 16:42:39.312+00	2023-01-09 16:49:48.422491+00
\.


--
-- Data for Name: sets Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.sets (set_id, repetitions, value, exercise_id, training_id, created_at, updated_at) FROM stdin
\.


--
-- Data for Name: trainings Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.trainings (training_id, title, date, user_id, created_at, updated_at) FROM stdin
2	My training of 09/01/2023	2023-01-09 11:13:36.642+00	3	2023-01-09 11:14:15.782+00	2023-01-09 11:14:15.782+00
\.


--
-- Data for Name: units Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.units (unit_id, title, user_id, created_at, updated_at) FROM stdin
1	kg	\N	2023-01-09 10:59:59.927+00	2023-01-09 16:37:29.204125+00
2	min	\N	2023-01-09 11:00:19.041+00	2023-01-09 16:37:29.204125+00
3	%	\N	2023-01-09 14:07:04.04+00	2023-01-09 16:37:29.204125+00
4	ans	\N	2023-01-09 14:10:02.156+00	2023-01-09 16:37:29.204125+00
9	kcal	\N	2023-01-09 16:36:48.701522+00	2023-01-09 16:37:29.204125+00
10	s	1	2023-01-09 16:44:35.712+00	2023-01-09 16:44:35.712+00
\.


--
-- Data for Name: users Type: TABLE DATA Schema: public Owner: jeremy
--

COPY public.users (user_id, first_name, last_name, email, password, created_at, updated_at) FROM stdin
1	Jeremy	Thomas	jeremy.thom26@yahoo.fr	$2b$10$uxEZHVHmCgivZdBBgf/4fumi93pon3H4UNYz02l6qchYFSaEV/zEC	2023-01-09 10:59:32.21+00	2023-01-09 10:59:32.21+00
2	Chloé 	Beelmeon 	beelmeon.chloe@gmail.com	$2b$10$3pc0kEpTz0gMhGeCrfB6IOOrw/EjDtJhfz4.jV3DsCHGAS1tGtdDW	2023-01-09 11:02:17.279+00	2023-01-09 11:02:17.279+00
3	Margot 	Chautrand 	margot@tux33.info	$2b$10$ji/oSVokB/SnjefFHZukVOFGqiYRwv07TwkM6cxmpjkvtZlIrcxL.	2023-01-09 11:13:24.318+00	2023-01-09 11:13:24.318+00
\.


--
-- Name: body_composition_categories_body_composition_category_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.body_composition_categories_body_composition_category_id_seq', 14, true)


--
-- Name: body_compositions_body_composition_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.body_compositions_body_composition_id_seq', 10, true)


--
-- Name: exercises_exercise_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.exercises_exercise_id_seq', 13, true)


--
-- Name: sets_set_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.sets_set_id_seq', 2, true)


--
-- Name: trainings_training_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.trainings_training_id_seq', 3, true)


--
-- Name: units_unit_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.units_unit_id_seq', 10, true)


--
-- Name: users_user_id_seq Type: SEQUENCE SET Schema: public Owner: jeremy
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true)


--
-- Name: body_composition_categories body_composition_categories_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_composition_categories
    ADD CONSTRAINT body_composition_categories_pkey PRIMARY KEY (body_composition_category_id)


--
-- Name: body_compositions body_compositions_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_compositions
    ADD CONSTRAINT body_compositions_pkey PRIMARY KEY (body_composition_id)


--
-- Name: exercises exercises_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (exercise_id)


--
-- Name: sets sets_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (set_id)


--
-- Name: trainings trainings_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.trainings
    ADD CONSTRAINT trainings_pkey PRIMARY KEY (training_id)


--
-- Name: units units_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (unit_id)


--
-- Name: users users_email_key Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email)


--
-- Name: users users_pkey Type: CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id)


--
-- Name: body_composition_categories trigger_updated_at_bodycompositioncategories Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_bodycompositioncategories BEFORE UPDATE ON public.body_composition_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: body_compositions trigger_updated_at_bodycompositions Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_bodycompositions BEFORE UPDATE ON public.body_compositions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: exercises trigger_updated_at_exercises Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_exercises BEFORE UPDATE ON public.exercises FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: sets trigger_updated_at_sets Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_sets BEFORE UPDATE ON public.sets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: trainings trigger_updated_at_trainings Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_trainings BEFORE UPDATE ON public.trainings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: units trigger_updated_at_units Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_units BEFORE UPDATE ON public.units FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: users trigger_updated_at_users Type: TRIGGER Schema: public Owner: jeremy
--

CREATE TRIGGER trigger_updated_at_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()


--
-- Name: body_composition_categories body_composition_categories_unit_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_composition_categories
    ADD CONSTRAINT body_composition_categories_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(unit_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: body_composition_categories body_composition_categories_user_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_composition_categories
    ADD CONSTRAINT body_composition_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: body_compositions body_compositions_body_composition_category_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_compositions
    ADD CONSTRAINT body_compositions_body_composition_category_id_fkey FOREIGN KEY (body_composition_category_id) REFERENCES public.body_composition_categories(body_composition_category_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: body_compositions body_compositions_user_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.body_compositions
    ADD CONSTRAINT body_compositions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: exercises exercises_unit_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(unit_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: exercises exercises_user_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: sets sets_exercise_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(exercise_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: sets sets_training_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_training_id_fkey FOREIGN KEY (training_id) REFERENCES public.trainings(training_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: trainings trainings_user_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.trainings
    ADD CONSTRAINT trainings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- Name: units units_user_id_fkey Type: FK CONSTRAINT Schema: public Owner: jeremy
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE


--
-- PostgreSQL database dump complete
--

