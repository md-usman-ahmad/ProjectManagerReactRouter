create database projectManager;
use projectManager;
create table users(
	userId int primary key auto_increment,
    firstname varchar(100),
    age int,
    gender enum("Male","Female"),
    username varchar(100),
    email varchar(100),
    password varchar(100),
    provider varchar(100)
);
select * from users;

create table projects(
	projectId int primary key auto_increment,
    title varchar(50),
    description varchar(200),
    createdAt date,
    updatedAt date,
    createdBy int,
    foreign key (createdBy) references users(userId)
);
select * from projects;

create table tasks(
	taskId int primary key auto_increment,
    title varchar(50),
    description varchar(200),
    createdAt date,
    updatedAt date,
    pId int,
    createdBy int,
    foreign key (createdBy) references users(userId),
    foreign key (pId) references projects(projectId) ON DELETE CASCADE
);
select * from tasks;
-- delete from tasks where taskId = 2
 -- drop table projects;