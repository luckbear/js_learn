import Mock from 'mockjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    Todos
} from './data/todoList'

export default {
    start() {
        let mock = new MockAdapter(axios); //创建MockAdapter实例
        //获取todo列表
        mock.onGet('/todo/list').reply(config => { //config指前台传过来的值
            let mockTodo = Todos.map(todo => {
                return {
                    id: todo.id,
                    title: todo.id,
                    count: todo.record.filter(data => !data.checked).length,
                    locked: todo.locked,
                    isDeleted: todo.isDeleted
                };
            }).filter(todo => !todo.isDeleted);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        todos: mockTodo
                    }]);
                }, 200);
            });
        });

        //新增一条todo
        mock.onPost('/todo/addTodo').reply(config => {
            Todos.unshift({
                id: Mock.Random.guid(),
                title: 'newList',
                isDeleted: false,
                locked: false,
                record: []
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200])
                }, 200);
            });
        });
        //获取单个todo内列表
        mock.onGet('/todo/listId').reply(config => {
            let {
                id
            } = config.params;

            let todo = Todos.find(todo => {
                return id && (todo.id === id)
            })

            todo.count = todo.record.filter(data => !data.checked).length;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        todo: todo
                    }])
                }, 200);
            });
        });

        //新增一条record
        mock.onPost('/todo/addRecord').reply(config => {
            let {
                id,
                text
            } = JSON.parse(config.data)

            Todos.some((t, index) => {
                if (t.id === id) {
                    t.record.push({
                        text: text,
                        isDeleted: false,
                        checked: false
                    });
                    return true
                };
            });
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    resolve([200])
                }, 200);
            })

        })
    }
};