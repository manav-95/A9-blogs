import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip } from "react-tooltip";
import axios from "axios";
import '../components/authorBlog.css';

import Underline from '@tiptap/extension-underline'
import { Link as ExLink } from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import { Superscript as Sup } from '@tiptap/extension-superscript'
import { Subscript as Sub } from '@tiptap/extension-subscript'
import FontSize from "@/components/FontSize";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'




import { Bold, ChevronDown, Heading1, Heading2, Heading3, Heading4, Heading5, Highlighter, Italic, Link, Palette, Pilcrow, Redo, Strikethrough, UnderlineIcon, Undo, TextQuote, EllipsisVertical, AlignCenter, AlignLeft, AlignRight, AlignJustify, Superscript, Subscript, List, ListOrdered, X } from 'lucide-react'
import { useParams } from 'react-router-dom';

const EditBlog = () => {

    const { id } = useParams();

    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        tags: [] as string[],

    });

    const [fetchedBlog, setFetchedBlog] = useState<any>();
    const [fetchedBlogContent, setFetchedBlogContent] = useState<any>();
    const [fetchedImage, setFetchedImage] = useState<any>();
    // const [fetchedTags, setFetchedTags] = useState<[]>([]);

    const [toggleColor, setToggleColor] = useState(false);

    const [openPopOver, setOpenPopOver] = useState(false);
    const [fontsDropdown, setFontsDropdown] = useState(false);
    const [sizeDropdown, setSizeDropdown] = useState(false);
    const [alignDropdown, setAlignDropdown] = useState(false);
    const [activeIcon, setActiveIcon] = useState<any>(Pilcrow);
    const [preview, setPreview] = useState<any>(null);
    const [image, setImage] = useState<any>(null);

    // let updatedTags = [...tags];
    // let processedTags = []

    const fetchBlog = async () => {
        if (!id || id === ":id") return;

        const { data } = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`);
        if (data) {
            console.log("Founded Blog: ", data)
            setFetchedBlog(data)
            setFormData({ title: data.title, tags: data.tags })
            setFetchedBlogContent(data.content)
            if (data.image) {
                setFetchedImage(data.image)
                setPreview(`http://localhost:5000/uploads/${data.image}`);
            }
            
            console.log("Image: ", image)
            
            
            // setFetchedTags(data.tags);

            //console.log("Fetched Tags: ", fetchedTags)
            let updatedTags = [...data.tags, ...tags];
            let processedTags = updatedTags.flatMap(tag => {
                try {
                    return JSON.parse(tag); // Parse JSON if valid
                } catch {
                    return tag; // Return as is if not JSON
                }
            });

            console.log("Processed Tags: ", processedTags)

            setTags(processedTags)


            editor?.commands.setContent(data.content);

        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id])



    const savedContent = localStorage.getItem("editorContent");

    let parsedContent = fetchedBlogContent;

    const editor = useEditor({

        extensions: [
            StarterKit,
            Underline,
            FontFamily,
            FontSize,
            Sup,
            Sub,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.extend({
                addOptions() {
                    return {
                        ...this.parent?.(),
                        types: [ListItem.name],
                    };
                },
            }),
            ExLink.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: () => true,
                shouldAutoLink: () => true,
            }),
            Highlight.configure({ multicolor: true }),
        ],
        content: parsedContent,
        onUpdate: ({ editor }) => {
            localStorage.setItem("editorContent", JSON.stringify(editor.getJSON()));
        },
    });



    if (!editor) {
        return null
    }

    const textButtons = [
        { text: 'Paragraph', icon: Pilcrow, onClick: () => { editor.chain().focus().setParagraph().run(); } },
        { text: 'Heading 1', icon: Heading1, onClick: () => { editor.chain().focus().toggleHeading({ level: 1 }).run(); } },
        { text: 'Heading 2', icon: Heading2, onClick: () => { editor.chain().focus().toggleHeading({ level: 2 }).run(); } },
        { text: 'Heading 3', icon: Heading3, onClick: () => { editor.chain().focus().toggleHeading({ level: 3 }).run(); } },
        { text: 'Heading 4', icon: Heading4, onClick: () => { editor.chain().focus().toggleHeading({ level: 4 }).run(); } },
        { text: 'Heading 5', icon: Heading5, onClick: () => { editor.chain().focus().toggleHeading({ level: 5 }).run(); } },
        { text: 'Numbered List', icon: ListOrdered, onClick: () => { editor.chain().focus().toggleOrderedList().run(); } },
        { text: 'Bullet List', icon: List, onClick: () => { editor.chain().focus().toggleBulletList().run(); } },
    ];

    const fonts = [
        { fontName: 'Normal', fontFamily: 'sans-serif' },
        { fontName: 'Comic Sans', fontFamily: '"Comic Sans MS", "Comic Sans"' },
        { fontName: 'Inter', fontFamily: 'Inter' },
        { fontName: 'Serif', fontFamily: 'serif' },
        { fontName: 'Monospace', fontFamily: 'monospace' },
        { fontName: 'Cursive', fontFamily: 'cursive' },
        { fontName: 'Exo 2', fontFamily: '"Exo 2"' },
    ];


    const textSizes = [
        { sizeName: 'Smaller', fontSize: '12px' },
        { sizeName: 'Small', fontSize: '14px' },
        { sizeName: 'Medium', fontSize: '16px' }, // Default
        { sizeName: 'Large', fontSize: '20px' },
        { sizeName: 'Extra Large', fontSize: '24px' },
    ];

    const alignItems = [
        { identity: 'subscript', icon: Subscript, toolTipID: 'sub-tooltip', onClick: () => editor.chain().focus().toggleSubscript().run() },
        { identity: 'superscript', icon: Superscript, toolTipID: 'sup-tooltip', onClick: () => editor.chain().focus().toggleSuperscript().run() },
        { textAlign: 'left', icon: AlignLeft, toolTipID: 'align-left-tooltip', onClick: () => editor.chain().focus().setTextAlign('left').run() },
        { textAlign: 'center', icon: AlignCenter, toolTipID: 'align-center-tooltip', onClick: () => editor.chain().focus().setTextAlign('center').run() },
        { textAlign: 'right', icon: AlignRight, toolTipID: 'align-right-tooltip', onClick: () => editor.chain().focus().setTextAlign('right').run() },
        { textAlign: 'justify', icon: AlignJustify, toolTipID: 'align-justify-tooltip', onClick: () => editor.chain().focus().setTextAlign('justify').run() },
    ]

    const getActiveHeading = () => {
        for (let i = 1; i <= 5; i++) {
            if (editor.isActive("heading", { level: i })) return i;
        }
        return null;
    };

    const activeHeading = getActiveHeading();

    const getActiveIcon = () => {
        if (editor.isActive("heading", { level: 1 })) return Heading1;
        if (editor.isActive("heading", { level: 2 })) return Heading2;
        if (editor.isActive("heading", { level: 3 })) return Heading3;
        if (editor.isActive("heading", { level: 4 })) return Heading4;
        if (editor.isActive("heading", { level: 5 })) return Heading5;
        if (editor.isActive("orderedList")) return ListOrdered;
        if (editor.isActive("bulletList")) return List;
        return Pilcrow; // Default: Paragraph
    };

    useEffect(() => {
        setActiveIcon(getActiveIcon());
    }, [editor.state]);

    // Function to get the currently active text size or default to "Medium"
    const getActiveTextSize = () => {
        const textStyle = editor.getAttributes("textStyle");
        return textSizes.find((size) => size.fontSize === textStyle.fontSize)?.sizeName || "Medium"; // Default to Medium
    };


    const getActiveFont = () => {
        const textStyle = editor.getAttributes('textStyle');
        return textStyle.fontFamily
            ? fonts.find((font) => font.fontFamily === textStyle.fontFamily)?.fontName || 'Normal'
            : 'Normal';
    };


    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        try {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url })
                .run()
        } catch (e: any) {
            alert(e.message)
        }
    }, [editor])



    // Handle Tag Input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim() && !tags.includes(inputValue.trim())) {
                const newTags = [...tags, inputValue.trim()];
                setTags(newTags);
                setFormData({ ...formData, tags: newTags });
            }
            setInputValue("");
        }
    };

    // Remove Tag
    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 0) {
            const file: File = e.target.files[0];
            console.log("type of file", typeof file)
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
            e.preventDefault();
        }
    };




    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!editor) {
            alert("Editor is not loaded yet!");
            return;
        }

        const content = editor.getHTML().trim(); // Get the editor content

        if (!formData.title.trim()) {
            alert("Title is required!");
            return;
        }

        // Convert HTML content to plain text and count words
        const plainText = content.replace(/<[^>]+>/g, " ").trim(); // Remove HTML tags
        const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length; // Count words

        if (!content || wordCount < 80) {
            alert(`Content must be at least 80 words! Current: ${wordCount} words.`);
            return;
        }


        if (tags.length === 0) {
            alert("Please add at least one tag!");
            return;
        }

        const userId = localStorage.getItem('userId') || '';

        const finalData = {
            title: formData.title.trim(),
            content: content,  // Include the editor content
            tags: tags,
            image: image || '',
            userId: userId,
        };

        console.log("Form Data Submitted:", finalData);

        try {
            const formdata = new FormData();
            formdata.append("title", finalData.title);
            formdata.append("content", finalData.content);
            formdata.append("tags", JSON.stringify(finalData.tags));
            if (finalData.image) {
                formdata.append("image", finalData.image); // ✅ Only append if not null
            }
            formdata.append("userId", finalData.userId);
            console.log(finalData.userId)

            const token = localStorage.getItem('accessToken');



            const response = await axios.post(`http://localhost:5000/api/blogs/blog/${id}`, formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                })

            console.log("Blog Created:", response.data);
            alert("Blog submitted successfully!");

            // Reset form fields after successful submission
            setTags([]);
            setInputValue("");
            setPreview(null);

            setFormData({ title: "", tags: [], });
            editor.commands.clearContent();
            localStorage.removeItem("editorContent");
            e.target.files = [];

        } catch (error: any) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Failed to submit blog. Please try again.");

        }
    };




    return (
        <>
            <Tooltip id="undo-tooltip" place="top" content="Undo" />
            <Tooltip id="redo-tooltip" place="top" content="Redo" />
            <Tooltip id="bold-tooltip" place="top" content="Bold" />
            <Tooltip id="italic-tooltip" place="top" content="Italic" />
            <Tooltip id="strike-tooltip" place="top" content="Strike Through" />
            <Tooltip id="underline-tooltip" place="top" content="Underline" />
            <Tooltip id="blockquote-tooltip" place="top" content="Blockquote" />
            <Tooltip id="link-tooltip" place="top" content="Link" />
            <Tooltip id="highlighter-tooltip" place="top" content="Highlighter" />
            <Tooltip id="color-tooltip" place="top" content="Text Color" />
            <Tooltip id="more-tooltip" place="top" content="More Options" />

            <Tooltip className="z-50" id="sup-tooltip" place="top" content="Super Script" />
            <Tooltip className="z-50" id="sub-tooltip" place="top" content="Sub Script" />
            <Tooltip className="z-50" id="align-left-tooltip" place="top" content="Align Left" />
            <Tooltip className="z-50" id="align-center-tooltip" place="top" content="Align Center" />
            <Tooltip className="z-50" id="align-right-tooltip" place="top" content="Align Right" />
            <Tooltip className="z-50" id="align-justify-tooltip" place="top" content="Align Justify" />


            <div className='w-full py-10'>
                <div className='max-w-7xl mx-auto px-4 py-4 bg-white'>

                    <form onKeyDown={preventEnterSubmit} onSubmit={handleSubmit} className="w-full bg-gray-100 rounded py-4 px-8 mb-8">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full py-1.5 px-4 mb-2" placeholder="Enter Blog Title" required />
                        <input type="text" value={inputValue} onKeyDown={handleKeyDown} onChange={(e) => setInputValue(e.target.value)} className="w-full py-1.5 px-4 mb-0" placeholder="Enter tags" />
                        <div className="flex flex-wrap py-4">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-gray-200 pl-4 pr-1 py-1 rounded-full mr-3 mb-2">
                                    <span className="text-black">{tag}</span>
                                    <button onClick={() => removeTag(index)} className="bg-red-500 py-1 px-1 rounded-full text-white"><X className="h-4 w-4" /></button>
                                </div>
                            ))}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className='bg-white w-full py-1.5 px-2 mb-2'
                        />



                        <div className="flex w-full justify-end">
                            <button
                                type="submit"
                                className={`py-2 px-10 text-white rounded
                                        ${formData.title.trim() && tags.length > 0
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!formData.title.trim() || tags.length === 0}
                            >
                                Publish
                            </button>
                        </div>
                    </form>

                    <div className="max-w-7xl text-4xl font-semibold text-center break-words">
                        {formData.title}
                    </div>


                    {preview && (
                        <div className="mt-2 w-full ">
                            <img src={preview} alt="Preview" className="w-full aspect -[7/4] object-top object-contain rounded" />
                        </div>
                    )}



                    <div className='flex flex-col mt-8'>
                        <div className='w-full flex items-center justify-start py-2 px-2 space-x-1 border-2 rounded'>
                            <button data-tooltip-id="bold-tooltip" onClick={() => editor?.chain().focus().toggleBold().run()} className={`${editor?.isActive('bold') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Bold strokeWidth={3} color={'currentColor'} size={19} /></button>
                            <button data-tooltip-id="italic-tooltip" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`${editor?.isActive('italic') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Italic strokeWidth={3} color={'currentColor'} size={19} /></button>
                            <button data-tooltip-id="strike-tooltip" onClick={() => editor?.chain().focus().toggleStrike().run()} className={`${editor?.isActive('strike') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Strikethrough strokeWidth={3} color={'currentColor'} size={19} /></button>
                            <button data-tooltip-id="underline-tooltip" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`${editor?.isActive('underline') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><UnderlineIcon strokeWidth={3} color={'currentColor'} size={19} /></button>

                            <div className='relative'>
                                <button onClick={() => { setOpenPopOver(!openPopOver); setFontsDropdown(false); setSizeDropdown(false); setAlignDropdown(false) }} className='flex items-center bg-gray-100  py-[5.2px] px-2 space-x-2 rounded'>
                                    {React.createElement(activeIcon, { strokeWidth: 2, color: "currentColor", size: 19 })}
                                    <ChevronDown className={`${openPopOver ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                </button>

                                {openPopOver && (
                                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-48">
                                        <div>
                                            {textButtons.map((item, index) => {
                                                const Icon = item.icon;
                                                const isActive =
                                                    item.text === "Paragraph" ? !activeHeading && !editor.isActive("orderedList") && !editor.isActive("bulletList") :
                                                        item.text.includes("Heading") ? editor.isActive("heading", { level: parseInt(item.text.split(" ")[1]) }) :
                                                            item.text === "Numbered List" ? editor.isActive("orderedList") :
                                                                item.text === "Bullet List" ? editor.isActive("bulletList") :
                                                                    false;

                                                return (
                                                    <div key={index} className="w-full rounded">
                                                        <button
                                                            onClick={() => {
                                                                item.onClick();
                                                                setActiveIcon(item.icon);
                                                                setOpenPopOver(false);
                                                            }}
                                                            className={`w-full px-2 py-2 flex items-center justify-start rounded ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            {React.createElement(Icon, { strokeWidth: 2, color: "currentColor", size: 20 })}
                                                            <span className="ml-2">{item.text}</span>
                                                        </button>
                                                        {index === 5 && <hr className='my-1 border' />}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                )}

                            </div>



                            <div className="relative">
                                <button onClick={() => { setFontsDropdown(!fontsDropdown); setOpenPopOver(false); setSizeDropdown(false); setAlignDropdown(false) }} className='text-nowrap flex items-center bg-gray-100  py-[5.2px] px-2 space-x-2 rounded'>
                                    <span>{getActiveFont()}</span>
                                    <ChevronDown className={`${fontsDropdown ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                </button>

                                {fontsDropdown &&
                                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-44">
                                        {fonts.map((font, index) => {
                                            const isActive = font.fontName === 'Normal'
                                                ? !editor.getAttributes('textStyle').fontFamily
                                                : editor.isActive('textStyle', { fontFamily: font.fontFamily });

                                            return (
                                                <div key={index} className="w-full rounded">
                                                    <button
                                                        onClick={() => {
                                                            if (font.fontName === 'Normal') {
                                                                editor.chain().focus().unsetFontFamily().run(); // Reset font
                                                            } else {
                                                                editor.chain().focus().setFontFamily(font.fontFamily).run();
                                                            }
                                                            setFontsDropdown(false);
                                                        }}
                                                        className={`w-full px-2 py-2 flex items-center justify-start rounded ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"}`}
                                                    >
                                                        <span style={{ fontFamily: font.fontFamily }}>{font.fontName}</span>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>


                            <div className="relative">
                                <button
                                    onClick={() => { setSizeDropdown(!sizeDropdown); setFontsDropdown(false); setOpenPopOver(false); setAlignDropdown(false) }}
                                    className="flex items-center bg-gray-100 py-[5.2px] px-2 space-x-2 rounded"
                                >
                                    <span className='text-nowrap'>{getActiveTextSize()}</span> {/* Show active text size */}
                                    <ChevronDown className={`${sizeDropdown ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                </button>

                                {sizeDropdown && (
                                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-44">
                                        {textSizes.map((size, index) => {
                                            const textStyle = editor.getAttributes("textStyle");
                                            const currentSize = textStyle.fontSize || "16px"; // Default to 16px (Medium)
                                            const isActive = currentSize === size.fontSize;

                                            return (
                                                <div key={index} className="w-full rounded">
                                                    <button
                                                        onClick={() => {
                                                            editor.chain().focus().setFontSize(size.fontSize).run();
                                                            setSizeDropdown(false);
                                                        }}
                                                        className={`w-full px-2 py-2 flex items-center justify-start rounded ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        <span style={{ fontSize: size.fontSize }} className={`ml-2`}>{size.sizeName}</span>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <button data-tooltip-id="blockquote-tooltip" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={`${editor?.isActive('blockquote') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><TextQuote strokeWidth={3} color={'currentColor'} size={19} /></button>
                            <button data-tooltip-id="link-tooltip" onClick={setLink} className={`${editor?.isActive('link') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Link strokeWidth={3} color={'currentColor'} size={19} /></button>
                            <button data-tooltip-id="highlighter-tooltip" onClick={() => editor?.chain().focus().toggleHighlight({ color: '#ffc078' }).run()} className={`${editor?.isActive('highlight') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Highlighter strokeWidth={3} color={'currentColor'} size={19} /></button>

                            <button
                                data-tooltip-id="color-tooltip"
                                onClick={() => {
                                    const isColor = editor?.isActive("textStyle", { color: "red" });

                                    if (isColor) {
                                        editor.chain().focus().unsetColor().run();
                                        setToggleColor(false || toggleColor);
                                    } else {
                                        editor.chain().focus().setColor("red").run();
                                        setToggleColor(true || toggleColor);
                                    }
                                }}
                                className={`${editor?.isActive("textStyle", { color: "red" })
                                    ? "bg-gray-200 text-black rounded"
                                    : "text-gray-500 hover:bg-gray-100 rounded"
                                    } px-4 py-2`}
                            >
                                <Palette strokeWidth={3} color={'currentColor'} size={19} />
                            </button>


                            <div className="relative">
                                <button onClick={() => { setAlignDropdown(!alignDropdown); setOpenPopOver(false); setFontsDropdown(false); setSizeDropdown(false) }} data-tooltip-id="more-tooltip" className="text-gray-500 pr-2 py-2"><EllipsisVertical strokeWidth={3} color={'currentColor'} size={19} /></button>
                                {alignDropdown &&
                                    <>
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow border flex justify-start items-center rounded p-1 space-x-2">
                                            <div className="flex items-center justify-start">
                                                {alignItems.slice(0, 2).map((item, index) => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <>
                                                            <button
                                                                onClick={item.onClick}
                                                                data-tooltip-id={item.toolTipID}
                                                                key={index}
                                                                className={`w-full px-2 py-2 flex items-center justify-start rounded ${editor.isActive(`${item.identity}`) ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"}`}
                                                            >
                                                                <Icon />
                                                            </button >
                                                        </>
                                                    )
                                                })}
                                            </div>

                                            <div className="h-10 border"></div>

                                            <div className="flex items-center justify-start">
                                                {alignItems.slice(2).map((item, index) => {
                                                    const Icon = item.icon;
                                                    const isActive = item.textAlign ? editor.isActive({ textAlign: item.textAlign }) : false;
                                                    return (
                                                        <>
                                                            <button
                                                                onClick={item.onClick}
                                                                data-tooltip-id={item.toolTipID}
                                                                key={index}
                                                                className={`w-full px-2 py-2 flex items-center justify-start rounded ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"}`}
                                                            >
                                                                <Icon />
                                                            </button >
                                                        </>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </>
                                }

                            </div>


                            <div className="flex w-full justify-end">
                                <button
                                    data-tooltip-id="undo-tooltip"
                                    onClick={() => editor?.chain().focus().undo().run()}
                                    disabled={!editor?.can().undo()}
                                    className={`pl-3.5 py-2 rounded ${editor?.can().undo()
                                        ? "text-black"
                                        : "text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <Undo strokeWidth={3} color={"currentColor"} size={19} />
                                </button>


                                <button
                                    data-tooltip-id="redo-tooltip"
                                    onClick={() => editor?.chain().focus().redo().run()}
                                    disabled={!editor?.can().redo()}
                                    className={`pl-3.5 pr-3 py-2 rounded ${editor?.can().redo()
                                        ? "text-black "
                                        : "text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <Redo strokeWidth={3} color={"currentColor"} size={19} />
                                </button>

                            </div>

                        </div>
                        {/* <hr className='my-2 border'/> */}
                        <div className='my-4 tiptap-editor overflow-auto h-[500px]'>
                            {editor &&
                                <EditorContent editor={editor} className="" />
                            }

                        </div>
                    </div>
                </div>

            </div >


        </>
    );
};

export default EditBlog;
