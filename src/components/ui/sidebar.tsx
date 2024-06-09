import { Dices } from 'lucide-react'
import { Button } from './button'
import { mapData } from '@/assets/data'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './themeProvider'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'

const Sidebar = () => {
  const navigate = useNavigate()
  const ref = useRef<HTMLInputElement>(null)
  const { isActive } = useTheme()

  useEffect(() => {
    if (isActive) {
      ref.current?.classList.add('active')
    } else {
      ref.current?.classList.remove('active')
    }
  }, [isActive])

  return (
    <div
      ref={ref}
      className={classNames(
        `border-r-2 min-h-screen`,
        { 'w-[50px]': isActive },
        { 'w-[300px]': !isActive },
      )}
    >
      <div
        className="flex items-center py-3 pl-3 border-b-2 h-16 cursor-pointer"
        onClick={() => navigate('/')}
      >
        {isActive ? null : <h1 className="text-2xl font-bold pr-2">UzChess</h1>}
        <Dices />
      </div>
      <div className="space-y-4 py-4">
        <div className="py-2">
          {mapData.map((el, index) => {
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start mb-2.5"
                onClick={() => navigate(el.route)}
              >
                {el.icon}
                {isActive ? null : (
                  <span className="font-bold text-1xl ml-2">{el.name}</span>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
