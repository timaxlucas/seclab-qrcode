import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { data } from "../data"
import { useState } from "react"
import styled, { css } from "styled-components"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional


const Wrapper = styled.div`
  
`

const WrapWrap = styled.div`
    display: flex;
`

const TileWrapper = styled.div`
  width: 580px;
  height: 10px;

  display: flex;
`

const TileC = styled.div`
  width: 10px;
  height: 10px;

  background: ${p => p.black ? 'black' : 'white'};
`

const ignoreAreas = [
    {
        from: [0,0],
        until: [15,15]
    }, {
        from: [0,42],
        until: [15,57]
    }, {
        from: [42,0],
        until: [57,15]
    }, {
        from: [40,40],
        until: [49,49]
    }
]

const ignorePixel = (i, j) => {
    for (const bound of ignoreAreas) {
        if (bound.from[0] <= i && bound.until[0] >= i && bound.from[1] <= j && bound.until[1] >= j) {
            return true
        }
    }
    return false
}

const buildNew = (data, modI = 0, modJ = 0) => {
    const arr = []
    for (let i = 0; i < data.length; i += 2) {
        let ar = []
        for (let j = 0; j < data[i].length; j += 2) {
            ar.push(ignorePixel(i, j) ? data[i][j] : data[i + modI][j + modJ])
        }
        arr.push(ar)
    }
    return arr;
}

const Tile = ({ inverted, black, string }) => {
  const [clicked, setClicked] = useState(false)

  return <Tippy content={string}><TileC onClick={() => setClicked(!clicked)} clicked={clicked} inverted={inverted} black={black} /></Tippy>
}

export default function Home() {
  return (
    <div className={styles.container}>
        <WrapWrap>
      <Wrapper>
        {buildNew(data, 0, 0).map((x, i) => (
          <TileWrapper>
            {x.map((z, j) => <Tile black={z.black} string={`${i} - ${j}`} />)}
          </TileWrapper>
        ))}
      </Wrapper>
      <Wrapper>
        {buildNew(data, 0, 1).map((x, i) => (
          <TileWrapper>
            {x.map((z, j) => <Tile black={z.black} string={`${i} - ${j}`} />)}
          </TileWrapper>
        ))}
      </Wrapper>
      </WrapWrap>
      <hr />
      <Wrapper>
        {data.map((x, i) => (
          <TileWrapper>
            {x.map((z, j) => <Tile black={z.black} string={`${i} - ${j}`} />)}
          </TileWrapper>
        ))}
      </Wrapper>
      <hr />
      <WrapWrap>
      <Wrapper>
        {buildNew(data, 1, 0).map((x, i) => (
          <TileWrapper>
            {x.map((z, j) => <Tile black={z.black} string={`${i} - ${j}`} />)}
          </TileWrapper>
        ))}
      </Wrapper>
      <Wrapper>
        {buildNew(data, 1, 1).map((x, i) => (
          <TileWrapper>
            {x.map((z, j) => <Tile black={z.black} string={`${i} - ${j}`} />)}
          </TileWrapper>
        ))}
      </Wrapper>
      </WrapWrap>
    </div>
  )
}
