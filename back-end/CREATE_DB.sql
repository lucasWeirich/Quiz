create schema if not exists quiz;
use quiz;

drop user if exists 'quiz_lucas';

create user 'quiz_lucas'@'%' identified with mysql_native_password by 'quiz';
grant all privileges on quiz. * to 'quiz_lucas'@'%';
flush privileges;

create table if not exists quiz.services(
	s_id integer primary key auto_increment,
    s_name varchar(255) not null,
    s_username varchar(255) not null,
    s_password varchar(255) not null,
    s_host varchar(255) not null,
    s_type varchar(255) not null,
    s_modified date not null ,
    s_favorite integer default 0
);
SELECT * FROM quiz.services;
drop table quiz.services;

INSERT INTO quiz.services (s_name,s_username,s_password,s_host,s_type,s_modified) VALUES('lucas', 'lucas_teste', 'jkycdkf', 'lucas.com.br', 'site', '2022-11-16');
INSERT INTO quiz.services (s_name,s_username,s_password,s_host,s_type,s_modified) VALUES("asd","sdf","safds","sdfsd","asda","asdasd");

select reserva.idReserva, reserva.justificativa, reserva.dataReserva,
reserva.periodo, sala.numero, professor.nome, turma.apelido, sala.idSala, professor.idProfessor, turma.idTurma 
from quiz.reserva inner join quiz.sala inner join quiz.professor inner join quiz.turma 
on reserva.idSala = sala.IdSala and reserva.idProfessor = professor.idProfessor and reserva.idTurma = turma.idTurma;
