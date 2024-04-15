"use client";

import React, { useRef } from 'react'
import Topbar from './Topbar'
import InputBox from './InputBox'
import OutputBox from './OutputBox'
import Bottombar from './Bottombar'
import { Editor } from '@tinymce/tinymce-react';

// mG3t1Ph0eA0P9WS3

const Container = () => {
    return (
        <div className="relative w-full h-full border bg-background shadow-2xl shadow-primary/10 dark:shadow-lg border-border rounded-xl">
            <Editor
                apiKey="el8pt63wb0yvbtyhx397s1m85ithwwomsdok788kl3g8vl9a"
                init={{
                    height: '100%',
                    menubar: false,
                    plugins: 'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | spellcheckdialog typography | forecolor backcolor | removeformat | spellcheckdialog a11ycheck',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Shreyas',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("Upgrade to premium to use this feature!")),
                    anchor_top: false,
                    contextmenu: false,
                    color_default_background: '#121212',
                    color_default_foreground: '#121212',
                    color_map: ['#121212', '#121212'],
                    content_style: '* { background-color: #121212; } body { font-family: Inter,sans-serif; font-size: 14px; background-color: #121212; color: #fff; }',
                    // suggest another skin here which is more dark other than 'oxide-dark'
                    skin: 'oxide'
                }}
                initialValue="Paste your text here..."
            />
        </div>
    )
}

export default Container
