'use client';
import { lightenDarkenColor } from "@/utils/colors";
import { sendTextMessage } from "@/utils/web-app-actions";
import { WebAppDataContext } from "@/utils/web-app-provider";
import { Button, Card, CardBody, Listbox, ListboxItem, Switch } from "@nextui-org/react";
import { useContext, useState } from "react";

export default function Home() {
  const { state } = useContext(WebAppDataContext);
  const [mainButtonActive, setMainButtonActive] = useState(false);
  const [closeConfirmationActive, setCloseConfirmationActive] = useState(false);

  const setExpand = () => {
    state.appData.expand();
  }

  const setMainButtonStatus = () => {
    const newState = !mainButtonActive;
    state.appData.MainButton.isVisible = newState;
    state.appData.MainButton[newState ? 'enable': 'disable']();
    setMainButtonActive(newState);
  };
  
  const setCloseConfirmation = () => {
    const newState = !closeConfirmationActive;
    state.appData.isClosingConfirmationEnabled = newState;
    setCloseConfirmationActive(newState)
  };

  const sendMessage = () => {
    sendTextMessage(state.appData);
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
         state.appData?.showAlert(`${position.coords.latitude} , ${position.coords.longitude}`);
      });
    } else {
        state.appData?.showAlert(`Geolocation is not supported in this browser.`);
    }
    return false;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-2">
      <Card
        style={
          {
            backgroundColor: `${lightenDarkenColor(state.appData.themeParams.secondary_bg_color, 85)}`,
            color: `${state.appData.themeParams.section_header_text_color}`
          }
        }
      >
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
          <div>
            <Button className="tg-button mt-4" onClick={ setExpand }>
              Expand layout
            </Button>
          </div>
          <div><Switch className="mt-4" isSelected={mainButtonActive} onChange={setMainButtonStatus} size="sm">Enable Main Button</Switch></div>
          <div><Switch className="mt-4" isSelected={closeConfirmationActive} onChange={setCloseConfirmation} size="sm">Enable Close Confirmation</Switch></div>
          
          <div>
            <Button className="tg-button mt-4" onClick={ sendMessage }>
              Send message to chat
            </Button>
          </div>

        </CardBody>
      </Card>

      <Card
        style={
          {
            backgroundColor: `${lightenDarkenColor(state.appData.themeParams.secondary_bg_color, 85)}`,
            color: `${state.appData.themeParams.section_header_text_color}`,
            width: '100%'
          }
        }
      >
        <Listbox>
          <ListboxItem key="regular_link">
            <a id="regular_link" href="https://telegram.org/" target="_blank">Regular link #2</a>
          </ListboxItem>
          <ListboxItem key="likebot"><a href="https://t.me/like">LikeBot t.me link</a></ListboxItem>
        </Listbox>
      </Card>


      {/* <ul>
        <li><a href="javascript:;" onclick="return DemoApp.requestLocation(this);">Request Location</a> <span></span></li>
        <li><a href="javascript:;" onclick="return DemoApp.requestVideo(this);">Request Video</a> <span></span></li>
        <li><a href="javascript:;" onclick="return DemoApp.requestAudio(this);">Request Audio</a> <span></span></li>
        <li><a href="javascript:;" onclick="return DemoApp.requestAudioVideo(this);">Request Audio+Video</a> <span></span></li>
        <li><a href="javascript:;" onclick="return DemoApp.testClipboard(this);" id="clipboard_test">Read from clipboard</a> <span></span></li>
    </ul> */}

    <Card
        style={
          {
            backgroundColor: `${lightenDarkenColor(state.appData.themeParams.secondary_bg_color, 85)}`,
            color: `${state.appData.themeParams.section_header_text_color}`,
            width: '100%'
          }
        }
      >
      <Listbox>
        <ListboxItem key="request_location" onClick={requestLocation}>Request Location</ListboxItem>
      </Listbox>
      </Card>

    </main>
  );
}
