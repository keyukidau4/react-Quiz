import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'
import moment from "moment"

const ResultTable = () => {
  const [dataResult, setDataResult] = useState([])

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_API_HOSTNAME}/api/results`, (data) => {
      setDataResult(data)
    })
  }, [])

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Attemps</th>
            <th scope="col">Earn Points</th>
            <th scope="col">Result</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {!dataResult ?? (
            <tr className="result-tr my-1">
              <th scope="row">1</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {dataResult &&
            dataResult.map((data, index) => (
              <tr className="result-tr" key={index}>
                <th scope="row">{index}</th>
                <td>{data.userName}</td>
                <td>{data.attempts}</td>
                <td>{data.points}</td>
                <td>{data.achived}</td>
                <td>{moment(data.updatedAt).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResultTable
