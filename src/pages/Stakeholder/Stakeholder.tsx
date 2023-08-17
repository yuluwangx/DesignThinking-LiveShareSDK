import './Stakeholder.css'
import {
  CommandBar,
  ICommandBarItemProps,
  Facepile,
  IFacepilePersona,
} from '@fluentui/react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Popover } from 'antd'
import { connectionConfig, containerSchema } from '../Sticker/Config'
import { initializeIcons } from '@fluentui/react'
import {
  AzureClient,
  AzureContainerServices,
} from '@fluidframework/azure-client'
import {
  BrainstormModel,
  createBrainstormModel,
} from '../Sticker/BrainstormModel'
import React, { useEffect, useState } from 'react'
// import * as React from 'react'
import { ConnectionState, IFluidContainer } from 'fluid-framework'
import { BrainstormView } from '../Sticker/view/BrainstormView'
import { DefaultColor } from '../Sticker/view/Color'
import { ColorPicker } from '../Sticker/view/ColorPicker'
import { NoteData } from '../Sticker/Types'
import { NOTE_SIZE } from '../Sticker/view/Note.style'
import { LiveCanvasPage } from '../Empathy/LiveCanvasPage'
const StakeholderMap: React.FC = () => {
  const ScenarioInfo = (
    <div style={{ width: '360px' }}>
      As-is Scenario Maps help to document collective understanding of user
      workflows and are best used as precursors to exploring new ideas. To-be
      Scenario Maps tell the story of a better experience for your user.
    </div>
  )

  interface MenuItem {
    label: JSX.Element
    key: string
  }

  const items: MenuItem[] = [
    {
      label: <a href="/stackholder">Stackholder Map</a>,
      key: '0',
    },
    {
      label: <a href="/empathymap">Empathy Map</a>,
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
        if (window.location.hash.length === 0) {
          isNew = true
        }
        const containerId = window.location.hash.substring(1)
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
        window.location.hash = containerId
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

  if (!container || !services) {
    return <div>Loading...</div> // Or return a loading spinner.
  }

  return (
    <div className="Enine">
      <div className="Eup">
        <div className="Eleft">
          <div className="Etext">Stakeholder Map</div>
          <div>
            <Popover
              content={ScenarioInfo}
              title="Scenario Map"
              trigger="hover">
              <img className="Einfo" src="/images/info.png" />
            </Popover>
            <div className="EdropDown">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="Emid">
          <div onClick={onAddNote}>
            <div>
              <img className="Einfo" src="/images/sticker.png" alt="" />
            </div>
            <div className="Enn">Sticker</div>
          </div>
          <div>
            <div>
              <img className="Einfo" src="/images/arrow.png" alt="" />
            </div>
            <div className="Enn">Arrow</div>
          </div>
          <div>
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
              Picture
            </div>
          </div>
          <div>
            <div>
              <img className="Einfo" src="/images/shape.png" alt="" />
            </div>
            <div className="Enn">Shape</div>
          </div>
          <div>
            <div>
              <img
                className="Einfo"
                src="/images/sticker.png"
                alt=""
                style={{ transform: 'translate(30%, 0%)' }}
              />
            </div>
            <div className="Enn " style={{ transform: 'translate(30%, 0%)' }}>
              Text
            </div>
          </div>
          <div>
            <div>
              <img
                className="Einfo"
                src="/images/language.png"
                alt=""
                style={{ transform: 'translate(-45%, 0%)' }}
              />
            </div>
            <div className="Enn" style={{ transform: 'translate(5%, 0%)' }}>
              Highlight
            </div>
          </div>
        </div>

        <div className="Eright">
          <div>
            <img className="Eback" src="/images/in.png" alt="" />
          </div>

          <div>
            <img className="Ereturn" src="/images/in.png" alt="" />
          </div>
        </div>
      </div>
      <BrainstormView container={container} services={services} />
      <LiveCanvasPage></LiveCanvasPage>
    </div>
  )
}

export default StakeholderMap
