import React from 'react'

const Header = props => {
  return (
    <div className='sfe__ohys_header'>
      <div className='ui basic container segment'>
        <h1 className='ui inverted header'>Ohys</h1>
        <p className='sfe__fontWhite'>
          Powered by Ohys-Raws.
          Copyright 2020 Seia-Soto. All rights reserved.
        </p>

        <div className='ui inverted menu'>
          <a className='active teal item' href='/'>
            /
          </a>
          <a className='item' href='https://discord.gg/EUvzwzx'>
            Ohys-Raws
          </a>

          <div className='right menu'>
            <a className='item' href='https://seia.io'>
              Seia-Soto
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
