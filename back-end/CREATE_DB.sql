create schema if not exists quiz;
use quiz;

drop user if exists 'quiz_lucas';

create user 'quiz_lucas'@'%' identified with mysql_native_password by 'quiz';
grant all privileges on quiz. * to 'quiz_lucas'@'%';
flush privileges;

/*
 ================================
 TABLE USER
 ================================
*/

create table if not exists quiz.user(
	id integer primary key auto_increment,
    name varchar(50) not null,
    username varchar(20) not null,
    password varchar(255) not null,
    date_created datetime default  now()
);

INSERT INTO quiz.user (name, username, password) VALUES('Lucas Weirich', 'lucasWeirich', '$2a$10$JBpEqK74I4yQllyjnUEw5eIstI4UJSZIJtnXRdgjc3303szRMI25.');
-- senhalucas
select * from quiz.user;
drop table quiz.user;

/*
 ================================
 TABLE ROOM
 ================================
*/

create table quiz.room(
	id integer primary key auto_increment,
    idAdm integer not null,
    name varchar(50) not null,
    password varchar(255) not null,
    status boolean not null,
    foreign key (idAdm) references quiz.user(id)
);

INSERT INTO quiz.room (idAdm, name, password, status) VALUES(1, 'Questions about calc!', '$2a$10$RYnlSrSaiDUKpft6kbm14.fahVmYVIgI/r/nPiQ1AZ7ZhlX..KGzC', true);
-- senhasala
select * from quiz.room;
drop table quiz.room;

/*
 ================================
 TABLE PARTICIPATION
 ================================
*/

create table quiz.participation(
	id integer primary key auto_increment,
    idRoom integer not null,
    idUser integer not null,
    punctuation float not null,
    foreign key (idRoom) references quiz.room(id),
    foreign key (idUser) references quiz.user(id)
);

INSERT INTO quiz.participation (idRoom, idUser, punctuation) VALUES(1, 1, 84.5);
select * from quiz.participation;
drop table quiz.participation;

/*
 ================================
 TABLE QUESTION
 ================================
*/

create table quiz.question(
	id integer primary key auto_increment,
    idRoom integer not null,
    statement varchar(255) not null,
    time integer not null, -- min(1) max(10)
    foreign key (idRoom) references quiz.room(id)
);

INSERT INTO quiz.question (idRoom, statement, time) VALUES(1, 'Essa pergunta é um teste, então qual o resultado de 9x9?', 5);
select * from quiz.question;
drop table quiz.question;

/*
 ================================
 TABLE ANSWER
 ================================
*/

create table quiz.answer(
	id integer primary key auto_increment,
    idQuestion integer not null,
    alternatives json not null, 
    foreign key (idQuestion) references quiz.question(id)
);

INSERT INTO quiz.answer (idQuestion, alternatives) VALUES(2, '[{"id":"a","text":"89","status":false},{"id":"b","text":"81","status":true},{"id":"c","text":"39","status":false},{"id":"d","text":"77","status":false}]');
select * from quiz.answer;
drop table quiz.answer;


-- -------------------------------------------------------------- --
-- PROCEDURES - SELECTS
-- -------------------------------------------------------------- --

-- -------------------------------------------------------------- --
-- Procura a sala com o id informado para entrar nela
delimiter $$
create procedure viewRoom(id_room integer)
begin
	select user.name as 'admin', room.name, room.status as 'status'
	from quiz.user inner join quiz.room on user.id = room.idAdm where room.id = id_room;
end$$
delimiter ;

call viewRoom(1);

-- -------------------------------------------------------------- --
-- Mostra todos os participantes da sala informada
delimiter $$
create procedure viewParticipations(id_room integer)
begin
	select user.name as 'name', user.username as 'username', participation.punctuation as 'punctuation'
	from quiz.user inner join quiz.participation on user.id = participation.idUser where participation.idRoom = id_room;
end$$
delimiter ;

call viewParticipations(1);

-- -------------------------------------------------------------- --
-- Mostra todas as questões da sala informada
delimiter $$
create procedure viewQuestions(id_room integer)
begin
	select question.id as 'id', question.statement as 'statement', question.time as 'time', answer.alternatives as 'alternatives'
    from quiz.question join quiz.answer on question.id = answer.idQuestion where question.idRoom = id_room;
end$$
delimiter ;

call viewQuestions(1);