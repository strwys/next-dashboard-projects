import React, { FC } from 'react'

interface HeaderProps {
  
}

const Header: FC<HeaderProps> = ({  }) => {
  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
        <div>
            <div>PT. Sarana Abadi Makmur Bersama</div>
        </div>
	</div>
  )
}

export default Header;