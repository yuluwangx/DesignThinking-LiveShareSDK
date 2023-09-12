import './StakeholderMap.css'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { Popover } from 'antd'
import { LiveShareClient } from '@microsoft/live-share'
import { TestLiveShareHost } from '../../utils/TestLiveShareHost'
import { LiveCanvas, InkingTool } from '@microsoft/live-share-canvas'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useLiveCanvas } from '../../utils/useLiveCanvas'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'; 
import { saveAs } from 'file-saver';
import { Modal, Button } from 'antd';



const StakeholderMap = () => {

  const [downloadComplete, setDownloadComplete] = useState(false); 

  const handleDownload = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      canvas.toBlob(function (blob) {
        saveAs(blob, 'StakeholderMap.png');
        setDownloadComplete(true); // Set download complete state to true
      });
    }
  };

  const closeNotification = () => {
    setDownloadComplete(false); // Close the notification
  };


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

  const stakeholderInfo = (
    <div style={{ width: '360px' }}>
      Stakeholder mapping is an invaluable asset for project management, 
      as it enables you to gain a better understanding of your 
      stakeholders and how to manage them effectively.
    </div>
  )
  const items = [
    {
      label: <a href="/stakeholder">Stakeholder Map</a>,
      key: '0',
    },
    {
      label: <a href="/back">Scenario Map</a>,
      key: '1',
    },
    {
      label: <a href="/back">Big Idea Vignettes</a>,
      key: '2',
    },

    {
      label: <a href="/back">Priorization Grid</a>,
      key: '3',
    },
    {
      label: <a href="/back">Needs Statement</a>,
      key: '4',
    },
    {
      label: <a href="/back">Storyboadrding</a>,
      key: '5',
    },
    {
      label: <a href="/back">Assumption and Questions</a>,
      key: '6',
    },
    {
      label: <a href="/back">Feedback Grid</a>,
      key: '7',
    },
    {
      label: <a href="/back">Experience-Based Roadmap</a>,
      key: '8',
    },


  ]
  return (
    <div className="Page">
      <div className='Top'>

        <div className='Eleft'>
          <div className='Etext'>
            <span>Stakeholder Map</span>
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
          <Popover content={stakeholderInfo} title="Stakeholder Map" trigger="hover">
            <img className='mapIcon' src="/images/info.png" />
          </Popover>
        </div>



        <div className='Emid'>
          <div>
            <div>
              <img className='mapIcon' src="/images/sticker.png" alt="" />
            </div>
            <div className='toolName'>
              Note
            </div>
          </div>

          <div onClick={clearCanvas}>
            <div>
              <img className='mapIcon' src="/images/clear.png" alt="" />
            </div>
            <div className='toolName'>
              Clear
            </div>
          </div>

          <div onClick={setToPen}>
            <div>
              <img className='mapIcon' src="/images/line.png" alt=""
                style={{ transform: 'translate(30%, 0%)' }} />
            </div>
            <div className='toolName'
            style={{ transform: 'translate(30%, 0%)' }} >
              Line
            </div>
          </div>

          <div>
            <div>
              <img className='mapIcon' src="/images/picture.png" alt=""
                style={{ transform: 'translate(30%, 0%)' }} />
            </div>
            <div className='toolName'
              style={{ transform: 'translate(35%, 0%)' }}>
              Image
            </div>
          </div>

          <div onClick={setToEraser}>
            <div>
              <img className='mapIcon' src="/images/shape.png" alt="" />
            </div>
            <div className='toolName'
              style={{ transform: 'translate(35%, 0%)' }}>
              Eraser
            </div>
            <div className='toolName'>
              
            </div>
          </div>
          <div onClick={setToLaserPointer}>
            <div>
              <img className='mapIcon' src="/images/sticker.png" alt=""
                style={{ transform: 'translate(30%, 0%)' }} />
            </div>
            <div className='toolName'
              style={{ transform: 'translate(30%, 0%)' }}>
              Laser
            </div>
          </div>
          <div onClick={setToHighlighter}>
            <div>
              <img className='mapIcon' src="/images/highlight.png" alt=""
                style={{ transform: 'translate(-45%, 0%)' }} />
            </div>
            <div className='toolName'
              style={{ transform: 'translate(5%, 0%)' }}>
              Highlight
            </div>
          </div>
        </div>


        <div className='Eright'>

          <div onClick={handleDownload}>
            <div>
              <img className="mapIcon" src="/images/download.png" alt="" />
            </div>
            <div className="toolName">Download</div>
          </div>

          <a id="downloadLink" style={{ display: 'none' }} />


          <div onClick={back}>  
            <div>
              <img className="mapIcon" src="/images/return.png" alt="" />
            </div>
            <div className="toolName">Back</div>
          </div>
          </div>

      </div>
      <div id="inkingRoot">
        <div id="inkingHost" ref={divRef}></div>
      </div>
    </div>
  )

}

export default StakeholderMap