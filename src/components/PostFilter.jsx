import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'


const PostFilter = ({filter, setFilter}) => {
  return (
    <div>

        <MyInput placeholder="Поиск" value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})} />

        <MySelect defaultValues="Сортировка" options={[
          {value: "title", name: "По названию"},
          {value: "body", name: "По описанию"}
        ]}
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})} />
      </div>
  )
}

export default PostFilter