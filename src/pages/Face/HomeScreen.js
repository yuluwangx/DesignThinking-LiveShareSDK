import React from 'react'
import './HomeScreen.css'
import { Popover } from 'antd'
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../../SignIn.js'
import { removePen } from '../../utils/pen_token'
import { removePenScen } from '../../utils/pen_token_scen'
import { removeSticker } from '../../utils/sticker_token'
const HomeScreen = () => {

  const navigate = useNavigate()

  const stakeholder = () => {
    navigate("/stakeholdermap")
  }

  const empathy = () => {
    navigate("/empathymap")
  }

  const scenario = () => {
    navigate("/scenariomap")
  }

  const big = () => {
    alert("ok")
  }

  const prio = () => {
    alert("ok")
  }

  const need = () => {
    alert("ok")
  }

  const story = () => {
    alert("ok")
  }

  const assum = () => {
    alert("ok")
  }

  const feed = () => {
    alert("ok")
  }

  const experience = () => {
    removePen()
    removePenScen()
    removeSticker()
    alert("clear ok")
  }

  const Back = () => {
    removePen()
    removePenScen()
    removeSticker()
    alert("clear finish")
  }

  const stackholderInfo = (
    <div style={{ width: '360px' }}>
      Empathy Maps help to rapidly put your team in the user’s shoes and
      align on pains and gains—whether at the
      beginning of a project or mid-stream when you need to re-focus on your user.
    </div>
  )

  const empathyInfo = (
    <div style={{ width: '360px' }}>
      Empathy Maps help to rapidly put your team in the user’s
      shoes and align on pains and gains—whether at the
      beginning of a project or mid-stream when you need to re-focus on your user.
    </div>
  )

  const ScenarioInfo = (
    <div style={{ width: '360px' }}>
      As-is Scenario Maps help to document collective understanding of
      user workflows and are best used as precursors to exploring new ideas.
      To-be Scenario Maps tell the story of a better experience for your user.
    </div>
  )

  const bigInfo = (
    <div style={{ width: '360px' }}>
      Once your team has a clear and validated understanding of
      your user’s problems and challenges, this activity is a great way
      for many people to rapidly brainstorm a breadth of possible ideas.
    </div>
  )

  const prioInfo = (
    <div style={{ width: '360px' }}>
      When many items (such as ideas, Hills, scenarios, or
      user stories) are being considered, this activity helps your team evaluate and prioritize
      them by focusing discussions or importance and feasibility.
    </div>
  )

  const needInfo = (
    <div style={{ width: '360px' }}>
      This is a very effective activity to use with your team
      when you feel that you’re drifting away from the actual needs, desires, and goals of your user.
      It helps reorient or reframe the work around your user.
    </div>
  )


  const storyInfo = (
    <div style={{ width: '360px' }}>
      Storyboarding is a way to iterate and communicate ideas
      and scenarios visually by telling user-centric stories. If you’re having a difficult
      time just talking about an idea, try some storyboarding.
    </div>
  )

  const assumInfo = (
    <div style={{ width: '360px' }}>
      Any time you feel that your team’s work needs a “reality check,”
      use this activity to identify and prioritize what assumptions are being made, what you’ve
      been guessing about, and what your team still doesn’t know.
    </div>
  )

  const feedInfo = (
    <div style={{ width: '360px' }}>
      This activity helps to gather and organize any sort of
      feedback and to then unpack questions and ideas—either in real time or
      after-the-fact—as an efficient means of determining next steps.
    </div>
  )

  const experienceInfo = (
    <div style={{ width: '360px' }}>
      This activity helps you define a “minimum delightful experience”
      by scoping big, visionary ideas into more achievable
      near-term outcomes—while still focusing on the user experience.
    </div>
  )




  return (
    <div className='nine'>
      <div className='up'>
        <div className='title'>
          <div className="text-container">
            <div className="text-content">
              <div>IBM Design Thinking</div>
              <div className='seco'>Toolkit</div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div><img className='logo' src="/images/IBM.png" /></div>
          <div className='uu'>
            <a className='playLink' href="www.baidu.com">
              <img className='play' src="/images/link.png" />
              IBM SkillsBuild - Design Thinking</a>
          </div>
        </div>
      </div>


      <div className='content'>

        <div className='firstRow'>
          <div className='block stackholder' onClick={stakeholder}>
            <Popover content={stackholderInfo} title="Stakeholer Map" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Stakeholder</div>
            <div className='ttt ttS'>Map</div>
          </div>

          <div className='block empathy' onClick={empathy}>
            <Popover content={empathyInfo} title="Empathy Map" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Empathy</div>
            <div className='ttt ttS'>Map</div>
          </div>

          <div className='block scenario' onClick={scenario}>
            <Popover content={ScenarioInfo} title="Scenario Map" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Scenario</div>
            <div className='ttt ttS'>Map</div>
          </div>

          <div className='block big' onClick={big}>
            <Popover content={bigInfo} title="Big Idea Vignettes" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Big Idea</div>
            <div className='ttt ttS'>Vignettes</div>
          </div>

          <div className='block prio' onClick={prio}>
            <Popover content={prioInfo} title="Prioritization Grid" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Prioritization</div>
            <div className='ttt ttS'>Grid</div>
          </div>
        </div>


        <div className='secondRow'>
          <div className='block need' onClick={need}>
            <Popover content={needInfo} title="Needs Statement" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Needs</div>
            <div className='ttt ttS'>Statement</div>
          </div>

          <div className='block story' onClick={story}>
            <Popover content={storyInfo} title="Storyboarding" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='story ttt'>Storyboarding</div>
          </div>

          <div className='block assum' onClick={assum}>
            <Popover content={assumInfo} title="Assumptions And Questions" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt sh'>Assumptions</div>
            <div className='ttt shh'>And</div>
            <div className='ttt  thr'>Questions</div>
          </div>

          <div className='block feed' onClick={feed}>
            <Popover content={feedInfo} title="Feedback Grid" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt'>Feedback</div>
            <div className='ttt ttS'>Grid</div>
          </div>

          <div className='block experience' onClick={experience}>
            <Popover content={experienceInfo} title="Experience Based Readmap" trigger="hover">
              <img className='info' src="/images/info.png" />
            </Popover>
            <div className='ttt sh'>Experience</div>
            <div className='ttt shh'>Based</div>
            <div className='ttt  thr'>Roadmap</div>
          </div>
        </div>
      </div>

      <div className='foot'>

        <div className='ff guide'>
          <img className='info' src="/images/guide.png" alt="" />
          <div className='footT s'>Guide</div>
        </div>

        <div className='ff help'>
          <img className='info' src="/images/help.png" alt="" />
          <div className='footT s'>Help</div>
        </div>

        <div className='ff lan'>
          <img className='info' src="/images/language.png" alt="" />
          <div className='footT '>Language</div>
        </div>

      </div>

    </div>

  )
}

export default HomeScreen

