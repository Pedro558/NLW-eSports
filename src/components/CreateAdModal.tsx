import { useState, useEffect, FormEvent } from 'react';
import { Input } from './Form/Input';
import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios';


interface Game{
  id: string;
  title: string;
}

export function CreateAdModal(){
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel] = useState(false)

  useEffect(() =>{
    axios('http://localhost:3000/games')
      .then(response =>{
        setGames(response.data)
      })
  }, [])

  function handleCreateAd(event: FormEvent){
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name){
      return
    }

    try{
      axios.post(`http://localhost:3000/games/${data.game}/ads`, {
      "name": data.name,
      "yearsPlaying": Number(data.yearsPlaying),
      "discord": data.discord,
      "weekDays": weekDays.map(Number),
      "hourStart": data.hourStart,
      "hourEnd": data.hourEnd,
      "useVoiceChannel": useVoiceChannel
      })
      alert("Anúncio criado com sucesso!")

    } catch(err){alert("Erro ao criar o anúncio")}
  }
  
  return(
    <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
        <Dialog.Content className='
          fixed
        bg-[#2A2634]
          py-8
          px-10
        text-white
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2 
          rounded-lg
          w-[480px]
          shadow-lg
        shadow-black/25
        '>
          <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <form className='flex flex-col gap-4 mt-8' onSubmit={handleCreateAd}>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game ?</label>
                
                
                <div className=' bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                  <Select.Root name='game'>
                    <Select.Trigger id="game" className='text-zinc-500 flex justify-between w-[100%]'>
                      <Select.Value placeholder='Selecione o game que deseja jogar'/>
                      <Select.Icon>
                        <CaretDown/>
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content>
                        <Select.ScrollUpButton>
                          <CaretUp/>
                        </Select.ScrollUpButton>
                     
                      <Select.Viewport className='bg-zinc-700 rounded-lg py-2 mt-8'>
                        <Select.Group>
                          {games.map(game =>{
                            return(
                              <Select.Item 
                              key={game.id}
                              value={game.id}
                              className='pl-2 flex text-white hover:bg-violet-500 rounded-md'>
                                <Select.ItemText>{game.title}</Select.ItemText>
                                <Select.ItemIndicator className='pl-2 text-emerald-600 hover:text-emerald-900'>
                                  <Check />
                                </Select.ItemIndicator>
                              </Select.Item>
                          )
                          })}
                       </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id='name' placeholder='Como te chamam dentro do game ?' />
              </div>


              <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos ?</label>
                  <Input name="yearsPlaying" id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord ?</label>
                  <Input name="discord" id='discord' type="text" placeholder='Usuario#0000' />
                </div>
              </div>


              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar ?</label>

                    <ToggleGroup.Root 
                    className='grid grid-cols-5 gap-1'
                    type="multiple"
                    onValueChange={setWeekDays}
                    > 
                      <ToggleGroup.Item 
                      value="0"
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Domingo">
                        D
                      </ToggleGroup.Item>

                      <ToggleGroup.Item 
                      value="1"
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Segunda">
                        S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                       value="2"
                       className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Terça">
                        T
                      </ToggleGroup.Item>

                      <ToggleGroup.Item 
                      value="3"
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Quarta">
                        Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item 
                      value="4"
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Quinta">
                        Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item 
                      value="5"
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Sexta">
                        S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item 
                      value="6"
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Sábado">
                        S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">
                    Qual horário do dia ?
                  </label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" name="hourStart" id="hourStart" placeholder='De'/>
                    <Input type="time" name="hourEnd" id="hourEnd" placeholder='Até'/>
                  </div>
                </div>
              </div>

              <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true){
                      setVoiceChannel(true)
                    } else {
                      setVoiceChannel(false)
                    }
                  }}  
                  className='
                    w-6
                    h-6
                    rounded
                    bg-zinc-900
                    p-1
                '>
                  <Checkbox.CheckboxIndicator>
                    <Check className='w-4 h4 text-emerald-400'/>
                  </Checkbox.CheckboxIndicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close className='
                bg-zinc-500 
                  px-5 
                  h-12 
                  rounded-md 
                  font-semibold 
                hover:bg-zinc-600
                '>
                  Cancelar
                </Dialog.Close>

                <button type='submit' className='
                  flex 
                  items-center 
                  bg-violet-500 
                  px-5 
                  h-12 
                  rounded-md 
                  font-semibold 
                  gap-3
                hover:bg-violet-600
                '>
                  <GameController className='w-6 h-6'/> 
                 Encontrar Duo
                </button>
              </footer>
            </form>
        </Dialog.Content>
      </Dialog.Portal>
  )
}