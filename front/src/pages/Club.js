import React from 'react'
import '../css/Club.css'

function Club() {
  return (
    <main className='club'>
      <section id='club-info'>
        <p id='league'>2 league</p>
        <p id='club-name'>FC Bystrzyca</p>
        <p id='next-game'>AC Strzyzewice: 11:00</p>
      </section>
      <div id='club-container'>
        <div id='stadium-container'>
          <section id='stadium'>
            <div id='club-description'>FC Bystrzyca</div>
            <div id='club-manager'>Manager</div>
            <div id='club-coach'>Coach</div>
            <div id='club-team'>Team</div>
          </section>
          <section id='chat'>
            <div id='message-container'>
              <p className='message'>
                <span className='sys-msg'>13:28 Marcelinc dołączył(a) do klubu</span>
                <span className='user-msg'></span>
              </p>
              <p>
                <span className='sys-msg'>13:28 Marcelinc: </span>
                <span className='user-msg'>siema</span>
              </p>
            </div>
            <div id='message-form'>
              <input type='text' id='msg-input'></input>
              <input type='submit' value='Send' id='msg-button'></input>
            </div>
          </section>
        </div>
        <aside id='players'>
          <div id='club-operation'>
            <span className='operation'>+</span>
            <span className='operation'>-</span>
          </div>
          <div id='player-list'>
            <p className='club-player'>
              <span className='position-numb'>11</span>
              <span className='player-nickname striker'>Marcelinc</span>
            </p>
            <p className='club-player'>
              <span className='position-numb'>4</span>
              <span className='player-nickname defender'>Vanisher</span>
            </p>
          </div>
        </aside>
      </div>
      
    </main>
  )
}

export default Club