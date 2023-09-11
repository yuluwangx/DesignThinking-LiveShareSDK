import './Stakeholder.css'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { Popover } from 'antd'
import { LiveShareClient } from '@microsoft/live-share'
import { TestLiveShareHost } from '../../utils/TestLiveShareHost'
import { LiveCanvas, InkingTool } from '@microsoft/live-share-canvas'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useLiveCanvas } from '../../utils/useLiveCanvas'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'



const StakeholderMap = () => {
  const navigate = useNavigate()
  const containerSchema = {
    initialObjects: {
      liveCanvas: LiveCanvas,
    },
  }

  const [liveCanvas, setliveCanvas] = useState(undefined)
  const divRef = useRef()
  const { inkingManager } = useLiveCanvas(liveCanvas, divRef.current)

  const back = async () => {
    console.log("???")
    navigate("/")
  }

  const setToPen = useCallback(() => {
    if (inkingManager) {
      console.log("Line button is being clicked")
      inkingManager.tool = InkingTool.pen
    }
  }, [inkingManager])

  const setToLaserPointer = useCallback(() => {
    if (inkingManager) {
      inkingManager.tool = InkingTool.laserPointer
    }
  }, [inkingManager])

  const setToHighlighter = useCallback(() => {
    if (inkingManager) {
      inkingManager.tool = InkingTool.highlighter
    }
  }, [inkingManager])

  const setToEraser = useCallback(() => {
    if (inkingManager) {
      inkingManager.tool = InkingTool.pointEraser
    }
  }, [inkingManager])

  const setToBlackBrush = useCallback(() => {
    if (inkingManager) {
      inkingManager.penBrush.color = { r: 0, g: 0, b: 0 }
    }
  }, [inkingManager])

  const setToBlueBrush = useCallback(() => {
    if (inkingManager) {
      inkingManager.penBrush.color = { r: 0, g: 0, b: 255, a: 1 }
    }
  }, [inkingManager])

  const setToRedBrush = useCallback(() => {
    if (inkingManager) {
      inkingManager.penBrush.color = { r: 255, g: 0, b: 0 }
    }
  }, [inkingManager])

  const clearCanvas = useCallback(() => {
    if (inkingManager) {
      inkingManager.clear()
    }
  }, [inkingManager])

  const initialize = async () => {
    const client = new LiveShareClient(TestLiveShareHost.create())
    console.log(client)
    const { container } = await client.joinContainer(containerSchema)
    setliveCanvas(container.initialObjects.liveCanvas)
  }

  useEffect(() => {
    initialize()
  }, [])

  const empathyInfo = (
    <div style={{ width: '360px' }}>
      Empathy Maps help to rapidly put your team in the user’s
      shoes and align on pains and gains—whether at the
      beginning of a project or mid-stream when you need to re-focus on your user.
    </div>
  )
  const items = [
    {
      label: <a href="/stackholder">Stackholder Map</a>,
      key: '0',
    },
    {
      label: <a href="/scenariomap">Scenario Map</a>,
      key: '1',
    },
    {
      label: <a href="https://www.aliyun.com">Big Idea Vignettes</a>,
      key: '2',
    },

    {
      label: <a href="https://www.aliyun.com">Priorization Grid</a>,
      key: '3',
    },
    {
      label: <a href="https://www.aliyun.com">Needs Statement</a>,
      key: '4',
    },
    {
      label: <a href="https://www.aliyun.com">Storyboadrding</a>,
      key: '5',
    },
    {
      label: <a href="https://www.aliyun.com">Assumption and Questions</a>,
      key: '6',
    },
    {
      label: <a href="https://www.aliyun.com">Feedback Grid</a>,
      key: '7',
    },
    {
      label: <a href="https://www.aliyun.com">Experience-Based Roadmap</a>,
      key: '8',
    },


  ]
  return (
    <div className="Enine">
      <div className='Eup'>

        <div className='Eleft'>
          <div className='Etext'>
            Empathy Map
          </div>
          <div>
            <Popover content={empathyInfo} title="Empathy Map" trigger="hover">
              <img className='Einfo' src="/images/info.png" />
            </Popover>
            <div className='EdropDown'>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>


        <div className='Emid'>
          <div>
            <div>
              <img className='Einfo' src="/images/sticker.png" alt="" />
            </div>
            <div className='Enn'>
              Sticker
            </div>
          </div>
          <div onClick={clearCanvas}>
            <div>
              <img className='Einfo' src="/images/arrow.png" alt="" />
            </div>
            <div className='Enn'>
              Clear
            </div>
          </div>
          <div onClick={setToPen}>
            <div>
              <img className='Einfo' src="/images/line.png" alt=""
                style={{ transform: 'translate(50%, 0)' }} />
            </div>
            <div className='Enn' style={{ transform: 'translate(50%, 0)' }}>
              Line
            </div>
          </div>
          <div>
            <div>
              <img className='Einfo' src="/images/picture.png" alt=""
                style={{ transform: 'translate(30%, 0%)' }} />
            </div>
            <div className='Enn'
              style={{ transform: 'translate(35%, 0%)' }}>
              Picture
            </div>
          </div>
          <div onClick={setToEraser}>
            <div>
              <img className='Einfo' src="/images/shape.png" alt="" />
            </div>
            <div className='Enn'>
              <button style={{
                background: 'none',
                border: 'none',
                padding: '0',
                font: 'inherit',
                cursor: 'pointer',
                outline: 'inherit'
              }}
                >
                Eraser
              </button>
            </div>
          </div>
          <div onClick={setToLaserPointer}>
            <div>
              <img className='Einfo' src="/images/sticker.png" alt=""
                style={{ transform: 'translate(30%, 0%)' }} />
            </div>
            <div className='Enn'
              style={{ transform: 'translate(30%, 0%)' }}>
              Laser
            </div>
          </div>
          <div onClick={setToHighlighter}>
            <div>
              <img className='Einfo' src="/images/language.png" alt=""
                style={{ transform: 'translate(-45%, 0%)' }} />
            </div>
            <div className='Enn'
              style={{ transform: 'translate(5%, 0%)' }}>
              Highlight
            </div>
          </div>
        </div>


        <div className='Eright'>
          <div>
            <img className='Eback' src="/images/in.png" alt=""
            />
          </div>

          <div>
            <img className='Ereturn' src="/images/in.png" alt=""
            />
          </div>
          <Button onClick={back}>back</Button>
        </div>

      </div>
      <div id="inkingRoot">
        <div id="inkingHost" ref={divRef}></div>
      </div>
    </div>
  )

}

export default StakeholderMap