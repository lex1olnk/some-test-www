import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { getData } from '../../actions/univAction'
import { classNames } from '../../utils/consts'

export const CreatableInput = (props) => {
  const {
    className,
    type,
    name,
    helper,
    setSelectedOption,
    post,
    get = getData,
    someV = null,
    label,
  } = props
  const [items, setItems] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    get(type).then((res) => {
      console.log(res)
      const data = res[type].map((item) => ({
        id: item.id,
        value: item.name,
        label: item.name,
      }))
      setIsLoading(false)
      setItems(data)
    })
  }, [])

  const handleCreate = async (value) => {
    setIsLoading(true)
    await post(value, someV).then((res) => {
      console.log(res)
      const newValue = { id: res.id, value: res.value, label: res.value, bookId: res.bookId }
      setIsLoading(false)
      setItems((prev) => [...prev, newValue])
    })
  }

  if (!items) return null

  return (
    <div className='flex flex-wrap -mx-3 mb-2'>
      <div className='w-full mx-auto px-3'>
        <Label value={label} />
        <CreatableSelect
          isLoading={isLoading}
          onChange={(newValue) => setSelectedOption({ target: { name: name, value: newValue } })}
          onCreateOption={handleCreate}
          options={items}
          className={className}
          classNamePrefix='select'
        />
      </div>
    </div>
  )
}

export const Input = (props) => {
  const {
    title = null,
    input = null,
    helper = null,
    onChange,
    type = 'text',
    name,
    className,
  } = props
  return (
    <div className={className}>
      <Label value={title} />
      <input
        className='appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        onChange={onChange}
        type={type}
        name={name}
        placeholder={input}
      />
    </div>
  )
}

export const Label = ({ value, className = '' }) => {
  return <div className={'tracking-wide text-gray-700 text-md mb-1' + ' ' + className}>{value}</div>
}

export const SelectedInput = (props) => {
  const {
    type,
    label,
    helper,
    name,
    setSelectedOption,
    valueType = 'value',
    isMulti = true,
    onSelect = false,
    className,
  } = props
  const [items, setItems] = useState(null)

  useEffect(() => {
    getData(type).then((res) => {
      const data = res.map((item) => ({
        id: item.id,
        value: item[valueType],
        label: item[valueType],
      }))
      setItems(data)
    })
  }, [])
  console.log()
  if (!items) return null

  return (
    <div className='flex flex-wrap -mx-3 mb-2'>
      <div className={classNames('w-full mx-auto px-3', className)}>
        <Label value={label} />
        <Select
          closeMenuOnSelect={onSelect}
          isMulti={isMulti}
          onChange={(newValue) => setSelectedOption({ target: { name: name, value: newValue } })}
          options={items}
          classNamePrefix='select'
        />
      </div>
    </div>
  )
}
