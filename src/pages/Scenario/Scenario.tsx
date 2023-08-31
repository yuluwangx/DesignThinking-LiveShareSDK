import './Scenario.css'
import {
  CommandBar,
  ICommandBarItemProps,
  Facepile,
  IFacepilePersona,
} from '@fluentui/react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Popover } from 'antd'
import { connectionConfig, containerSchema } from '../Sticker/Config'
import { LiveShareClient } from '@microsoft/live-share'
import { TestLiveShareHostScen } from '../../utils/TestLiveShareHostScen'
import { LiveCanvas, InkingTool } from '@microsoft/live-share-canvas'
import { initializeIcons } from '@fluentui/react'
import {
  AzureClient,
  AzureContainerServices,
} from '@fluidframework/azure-client'
import {
  BrainstormModel,
  createBrainstormModel,
} from '../Sticker/BrainstormModel'
import React, { useEffect, useState, useRef, useCallback } from 'react'
// import * as React from 'react'
import { ConnectionState, IFluidContainer } from 'fluid-framework'
import { BrainstormView } from '../Sticker/view/BrainstormView'
import { DefaultColor } from '../Sticker/view/Color'
import { ColorPicker } from '../Sticker/view/ColorPicker'
import { NoteData } from '../Sticker/Types'
import { NOTE_SIZE } from '../Sticker/view/Note.style'
import { LiveCanvasPage } from '../Empathy/LiveCanvasPage'
import { useNavigate } from 'react-router-dom'
import { getSticker, setSticker } from '../../utils/sticker_token'
import { Button } from 'react-bootstrap'
import { useLiveCanvas } from '@microsoft/live-share-react'
const ScenarioMap: React.FC = () => {
  const ScenarioInfo = (
    <div style={{ width: '360px' }}>
      As-is Scenario Maps help to document collective understanding of user
      workflows and are best used as precursors to exploring new ideas. To-be
      Scenario Maps tell the story of a better experience for your user.
    </div>
  )
  const navigate = useNavigate()
  const back = async () => {
    navigate('/homeScreen')
  }

  interface MenuItem {
    label: JSX.Element
    key: string
  }
  const empathy = () => {
    navigate('/empathymap')
  }

  const items: MenuItem[] = [
    {
      label: <a href=" ">Stackholder Map</a >,
      key: '0',
    },
    {
      label: <div onClick={empathy}>Empathy Map</div>,
      key: '1',
    },
    {
      label: <a href="https://www.aliyun.com">Big Idea Vignettes</a >,
      key: '2',
    },
    {
      label: <a href="https://www.aliyun.com">Priorization Grid</a >,
      key: '3',
    },
    {
      label: <a href="https://www.aliyun.com">Needs Statement</a >,
      key: '4',
    },
    {
      label: <a href="https://www.aliyun.com">Storyboadrding</a >,
      key: '5',
    },
    {
      label: <a href="https://www.aliyun.com">Assumption and Questions</a >,
      key: '6',
    },
    {
      label: <a href="https://www.aliyun.com">Feedback Grid</a >,
      key: '7',
    },
    {
      label: <a href="https://www.aliyun.com">Experience-Based Roadmap</a >,
      key: '8',
    },
  ]

  const [container, setContainer] = useState<IFluidContainer | null>(null)
  const [services, setServices] = useState<AzureContainerServices | null>(null)

  const model = React.useMemo(() => {
    if (container) {
      // @ts-ignore
      return createBrainstormModel(container)
    }
  }, [container])
  const audience = React.useMemo(() => services?.audience, [services])
  const [members, setMembers] = React.useState(
    audience ? Array.from(audience.getMembers().values()) : []
  )
  const colorButtonRef = React.useRef<any>()

  const setMembersCallback = React.useCallback(
    () =>
      setMembers(audience ? Array.from(audience.getMembers().values()) : []),
    [setMembers, audience]
  )
  const personas: IFacepilePersona[] = [
    {
      imageUrl: 'https://example.com/path/to/image.jpg',
      imageInitials: 'TS',
      personaName: 'Example Name',
      // secondaryText: 'Example Title',
    },
  ]
  const farItems: ICommandBarItemProps[] = [
    {
      key: 'presence',
      onRender: () => (
        <Facepile
          styles={{ root: { alignSelf: 'center' } }}
          personas={personas}
        />
      ),
    },
  ]

  React.useEffect(() => {
    if (container && audience) {
      container.on('connected', setMembersCallback)
      audience.on('membersChanged', setMembersCallback)
      return () => {
        container.off('connected', setMembersCallback)
        audience.off('membersChanged', setMembersCallback)
      }
    }
  }, [container, audience, setMembersCallback])

  useEffect(() => {
    const start = async () => {
      initializeIcons()
      const getContainerId = (): { containerId: string; isNew: boolean } => {
        let isNew = false
        if (getSticker() === null) {
          isNew = true
        }
        const containerId = getSticker()
        //@ts-ignore
        return { containerId, isNew }
      }

      const { containerId, isNew } = getContainerId()
      const client = new AzureClient(connectionConfig)
      let container: IFluidContainer
      let services: AzureContainerServices
      if (isNew) {
        ;({ container, services } = await client.createContainer(
          containerSchema
        ))
        const containerId = await container.attach()
        setSticker(containerId)
      } else {
        ;({ container, services } = await client.getContainer(
          containerId,
          containerSchema
        ))
      }

      if (container.connectionState !== ConnectionState.Connected) {
        await new Promise<void>((resolve) => {
          container.once('connected', () => {
            resolve()
          })
        })
      }
      setContainer(container)
      setServices(services)
    }
    start().catch((error) => console.error(error))
  }, [])

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }
  const [color, setColor] = React.useState(DefaultColor)
  const onAddNote = () => {
    setZIndexBrainstormView(2)
    setZIndexDiv(1)
    const { scrollHeight, scrollWidth } = document.getElementById('NoteSpace')!
    const id = uuidv4()
    const newCardData: NoteData = {
      id,
      position: {
        x: Math.floor(Math.random() * (scrollWidth - NOTE_SIZE.width)),
        y: Math.floor(Math.random() * (scrollHeight - NOTE_SIZE.height)),
      },
      lastEdited: {
        // @ts-ignore
        userId: '登录后修改',
        // @ts-ignore
        userName: '登录后修改',
        time: Date.now(),
      },
      // @ts-ignore
      author: '登录后修改',
      numLikesCalculated: 0,
      didILikeThisCalculated: false,
      color,
    }
    //@ts-ignore
    model.SetNote(id, newCardData)
  }

  const liveCanvasRef = useRef(null)
  const [active, setActive] = useState(true)
  const [tool, setTool] = useState(InkingTool.pen)
  const [eraser, setEraser] = useState(InkingTool.eraser)
  const [isCursorShared, setIsCursorShared] = useState(true)
  const { liveCanvas } = useLiveCanvas(
    'CUSTOM-LIVE-CANVAS',
    liveCanvasRef,
    active,
    tool,
    // eraser,
    undefined,
    undefined,
    undefined,
    undefined,
    isCursorShared
  )
  const [zIndexDiv, setZIndexDiv] = useState(1)

  const [zIndexBrainstormView, setZIndexBrainstormView] = useState(0)

  const [pE, setPE] = useState('none')

  const doPe = () => {
    setPE('auto')
  }

  // const [isDrawingMode, setIsDrawingMode] = useState(false)

  const SetLine = () => {
    // setIsDrawingMode(true)
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'auto'
    console.log('笔')
    setTool(InkingTool.pen)
  }

  const stickerOn = () => {
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'none'
    // setZIndexDiv(-10)
    setIsImageMoveMode(false)
  }

  const SetEr = () => {
    //@ts-ignore
    liveCanvasRef.current.style.pointerEvents = 'auto'
    setTool(InkingTool.eraser)
  }

  const [isDrawingMode, setIsDrawingMode] = useState(false)

  const handleMouseOverCanvas = () => {
    if (isDrawingMode) {
      //@ts-ignore
      liveCanvasRef.current.style.pointerEvents = 'auto'
    }
  }

  const handleMouseOutCanvas = () => {
    if (isDrawingMode) {
      //@ts-ignore
      liveCanvasRef.current.style.pointerEvents = 'none'
    }
  }

  const [imgSrc, setImgSrc] = useState(null)
  const imageRef = useRef(null)

  //@ts-ignore
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      //@ts-ignore
      reader.onloadend = () => {
        //@ts-ignore
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  //@ts-ignore
  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    e.dataTransfer.setData('offsetX', offsetX)
    e.dataTransfer.setData('offsetY', offsetY)
  }

  //@ts-ignore
  const handleDrop = (e) => {
    e.preventDefault()

    const offsetX = e.dataTransfer.getData('offsetX')
    const offsetY = e.dataTransfer.getData('offsetY')

    const x = e.clientX - e.target.getBoundingClientRect().left - offsetX
    const y = e.clientY - e.target.getBoundingClientRect().top - offsetY
    //@ts-ignore
    imageRef.current.style.left = `${x}px`
    //@ts-ignore
    imageRef.current.style.top = `${y}px`
  }

  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  //@ts-ignore
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setScale((prev) => Math.max(prev - 0.1, 0.5))
    } else {
      setScale((prev) => Math.min(prev + 0.1, 3))
    }
  }
  //@ts-ignore
  const handleMouseDown = (e) => {
    //@ts-ignore
    setIsDragging(true)
    //@ts-ignore
    setStartX(e.clientX)
  }
  //@ts-ignore
  const handleMouseUp = () => {
    //@ts-ignore
    setIsDragging(false)
  }
  //@ts-ignore
  const handleMouseMove = (e) => {
    //@ts-ignore
    if (isDragging) {
      //@ts-ignore
      const diffX = e.clientX - startX
      //@ts-ignore
      setRotation((prev) => prev + diffX * 0.5)
      //@ts-ignore
      setStartX(e.clientX)
    }
  }

  const [isImageMoveMode, setIsImageMoveMode] = useState(false)
  const setImg = () => {
    setIsImageMoveMode(true)
    setZIndexDiv(1)
  }

  if (!container || !services) {
    return <div>Loading...</div> // Or return a loading spinner.
  }

  return (
    <div className="Enine">
      <div className="Eup">
        <div className="Eleft">
          <div className="Etext">Scenario Map</div>
          <div>
            <Popover
              content={ScenarioInfo}
              title="Scenario Map"
              trigger="hover">
              < img className="Einfo" src="/images/info.png" />
            </Popover>
            <div className="EdropDown">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a >
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="Emid">
          <div onClick={onAddNote}>
            <div>
              < img className="Einfo" src="/images/sticker.png" alt="" />
            </div>
            <div className="Enn">Sticker</div>
          </div>
          <div
            onClick={() => {
              setTool(InkingTool.laserPointer)
            }}>
            <div>
              < img className="Einfo" src="/images/arrow.png" alt="" />
            </div>
            <div className="Enn">Laser</div>
          </div>
          <div onClick={SetLine}>
            <div>
              <img
                className="Einfo"
                src="/images/line.png"
                alt=""
                style={{ transform: 'translate(50%, 0)' }}
              />
            </div>
            <div className="Enn" style={{ transform: 'translate(50%, 0)' }}>
              Line
            </div>
          </div>
          <div>
            <div>
              <img
                className="Einfo"
                src="/images/picture.png"
                alt=""
                style={{ transform: 'translate(30%, 0%)' }}
              />
            </div>
            <div className="Enn" style={{ transform: 'translate(35%, 0%)' }}>
              <label htmlFor="fileInput">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                Picture
              </label>
            </div>
          </div>
          <div onClick={SetEr}>
            <div>
              < img className="Einfo" src="/images/shape.png" alt="" />
            </div>
            <div className="Enn">Eraser</div>
          </div>
          <div onClick={stickerOn}>
            <div>
              <img
                className="Einfo"
                src="/images/sticker.png"
                alt=""
                style={{ transform: 'translate(30%, 0%)' }}
              />
            </div>
            <div className="Enn " style={{ transform: 'translate(30%, 0%)' }}>
              Move
            </div>
          </div>
          <div onClick={setImg}>
            <div>
              <img
                className="Einfo"
                src="/images/language.png"
                alt=""
                style={{ transform: 'translate(-45%, 0%)' }}
              />
            </div>
            <div className="Enn" style={{ transform: 'translate(5%, 0%)' }}>
              Move
            </div>
          </div>
        </div>

        <div className="Eright">
          <div onClick={back}>
            <div>
              < img className="Einfo" src="/images/return.png" alt="" />
            </div>
            <div className="Enn">Back</div>
          </div>
        </div>
        
      </div>

      <div
        style={{
          backgroundImage: 'url(/images/bg.png)',
          position: 'relative',
        }}>
        <div
          onMouseOver={handleMouseOverCanvas}
          onMouseOut={handleMouseOutCanvas}
          ref={liveCanvasRef}
          style={{
            width: '1278px',
            height: '800px',
            border: '1px solid black',
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            width: '1278px',
            height: '800px',
            border: '1px solid black',
            position: 'absolute',
            overflow: 'hidden',
            zIndex: zIndexDiv,
            pointerEvents: isImageMoveMode ? 'auto' : 'none',
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}>
          {imgSrc && (
            <img
              ref={imageRef}
              src={imgSrc}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              draggable="true"
              onDragStart={handleDragStart}
              style={{
                position: 'absolute',
                width: '150px',
                // cursor: 'move',
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            />
          )}
        </div>
        <div
          style={{
            zIndex: -1,
          }}>
          <BrainstormView container={container} services={services} />
        </div>
      </div>
    </div>
  )
}

export default ScenarioMap